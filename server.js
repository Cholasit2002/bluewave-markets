const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

const rootDir = __dirname;
const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || "127.0.0.1";
const cacheTtlMs = 6 * 60 * 60 * 1000;

loadDotEnv();

const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
const marketCache = {
  expiresAt: 0,
  payload: null
};

const staticFiles = {
  "/": "index.html",
  "/index.html": "index.html",
  "/styles.css": "styles.css",
  "/app.js": "app.js"
};

const fallbackOverview = [
  {
    name: "S&P 500",
    proxy: "SPY",
    ticker: "SPX",
    value: 5214.8,
    change: 1.24,
    trend: "Demo mode fallback",
    movingAverages: { ma10: "above", ma20: "above", ma50: "above", ma200: "above" }
  },
  {
    name: "Nasdaq 100",
    proxy: "QQQ",
    ticker: "NDX",
    value: 18336.5,
    change: 1.81,
    trend: "Demo mode fallback",
    movingAverages: { ma10: "above", ma20: "above", ma50: "above", ma200: "above" }
  },
  {
    name: "Russell 2000",
    proxy: "IWM",
    ticker: "RUT",
    value: 2072.6,
    change: -0.28,
    trend: "Demo mode fallback",
    movingAverages: { ma10: "below", ma20: "neutral", ma50: "above", ma200: "above" }
  }
];

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8"
};

function loadDotEnv() {
  const envPath = path.join(rootDir, ".env");
  if (!fs.existsSync(envPath)) return;

  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    if (!line || line.trim().startsWith("#")) continue;
    const separatorIndex = line.indexOf("=");
    if (separatorIndex === -1) continue;
    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();
    if (key && !process.env[key]) {
      process.env[key] = value;
    }
  }
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": mimeTypes[".json"],
    "Cache-Control": "no-store"
  });
  res.end(JSON.stringify(payload));
}

function sendFile(res, filePath) {
  const extension = path.extname(filePath);
  const contentType = mimeTypes[extension] || "application/octet-stream";
  fs.readFile(filePath, (error, data) => {
    if (error) {
      sendJson(res, 404, { error: "File not found" });
      return;
    }

    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
}

function average(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function classifyMaStatus(close, ma) {
  const delta = ((close - ma) / ma) * 100;
  if (delta > 0.75) return "above";
  if (delta < -0.75) return "below";
  return "neutral";
}

function formatTrend(change, movingAverages) {
  const aboveCount = Object.values(movingAverages).filter((status) => status === "above").length;
  if (change >= 1 && aboveCount >= 3) return "Momentum expanding";
  if (change < 0 && aboveCount <= 1) return "Trend under pressure";
  if (aboveCount >= 3) return "Trend constructive";
  return "Short-term consolidation";
}

async function fetchDailySeries(symbol) {
  const endpoint = new URL("https://www.alphavantage.co/query");
  endpoint.searchParams.set("function", "TIME_SERIES_DAILY");
  endpoint.searchParams.set("symbol", symbol);
  endpoint.searchParams.set("outputsize", "compact");
  endpoint.searchParams.set("apikey", apiKey);

  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`Alpha Vantage HTTP ${response.status}`);
  }

  const payload = await response.json();
  const note = payload.Note || payload.Information || payload["Error Message"];
  if (note) {
    throw new Error(note);
  }

  const series = payload["Time Series (Daily)"];
  if (!series) {
    throw new Error("Missing daily series");
  }

  const ordered = Object.entries(series)
    .sort(([dateA], [dateB]) => (dateA < dateB ? 1 : -1))
    .map(([date, row]) => ({
      date,
      close: Number(row["4. close"])
    }));

  return ordered;
}

async function buildLiveOverview() {
  if (!apiKey) {
    return {
      source: "fallback",
      asOf: new Date().toISOString(),
      note: "Missing ALPHA_VANTAGE_API_KEY; showing demo data.",
      overview: fallbackOverview
    };
  }

  const proxies = [
    { name: "S&P 500", ticker: "SPX", proxy: "SPY" },
    { name: "Nasdaq 100", ticker: "NDX", proxy: "QQQ" },
    { name: "Russell 2000", ticker: "RUT", proxy: "IWM" }
  ];

  const overview = [];
  for (const [index, item] of proxies.entries()) {
    if (index > 0) {
      await wait(1100);
    }

    const series = await fetchDailySeries(item.proxy);
    const closes = series.map((entry) => entry.close);
    const latest = closes[0];
    const previous = closes[1];
    const movingAverages = {
      ma10: classifyMaStatus(latest, average(closes.slice(0, 10))),
      ma20: classifyMaStatus(latest, average(closes.slice(0, 20))),
      ma50: classifyMaStatus(latest, average(closes.slice(0, 50))),
      ma200: classifyMaStatus(latest, average(closes.slice(0, Math.min(200, closes.length))))
    };

    overview.push({
      name: item.name,
      ticker: item.ticker,
      proxy: item.proxy,
      value: latest,
      change: Number((((latest - previous) / previous) * 100).toFixed(2)),
      trend: formatTrend((((latest - previous) / previous) * 100), movingAverages),
      movingAverages,
      asOf: series[0].date
    });
  }

  return {
    source: "alpha-vantage",
    asOf: new Date().toISOString(),
    note: "Major index cards use ETF proxies (SPY, QQQ, IWM) to stay within Alpha Vantage free tier.",
    overview
  };
}

async function getMarketOverview() {
  if (marketCache.payload && marketCache.expiresAt > Date.now()) {
    return marketCache.payload;
  }

  try {
    const payload = await buildLiveOverview();
    marketCache.payload = payload;
    marketCache.expiresAt = Date.now() + cacheTtlMs;
    return payload;
  } catch (error) {
    const fallbackPayload = {
      source: "fallback",
      asOf: new Date().toISOString(),
      note: `Alpha Vantage unavailable right now; showing demo data. ${error.message}`,
      overview: fallbackOverview
    };
    marketCache.payload = fallbackPayload;
    marketCache.expiresAt = Date.now() + 60 * 1000;
    return fallbackPayload;
  }
}

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);

  if (requestUrl.pathname === "/api/market-overview") {
    const payload = await getMarketOverview();
    sendJson(res, 200, payload);
    return;
  }

  if (requestUrl.pathname === "/api/health") {
    sendJson(res, 200, {
      ok: true,
      service: "bluewave-markets",
      hasApiKey: Boolean(apiKey),
      timestamp: new Date().toISOString()
    });
    return;
  }

  const staticFile = staticFiles[requestUrl.pathname];
  if (staticFile) {
    sendFile(res, path.join(rootDir, staticFile));
    return;
  }

  sendJson(res, 404, { error: "Not found" });
});

server.listen(port, host, () => {
  console.log(`BlueWave Markets running at http://${host}:${port}`);
});
