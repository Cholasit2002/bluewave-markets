const defaultIndexOverview = [
  {
    name: "S&P 500",
    ticker: "SPX",
    value: 5214.8,
    change: 1.24,
    trend: "Broad participation improving",
    movingAverages: { ma10: "above", ma20: "above", ma50: "above", ma200: "above" }
  },
  {
    name: "Nasdaq 100",
    ticker: "NDX",
    value: 18336.5,
    change: 1.81,
    trend: "Growth leadership remains intact",
    movingAverages: { ma10: "above", ma20: "above", ma50: "above", ma200: "above" }
  },
  {
    name: "Russell 2000",
    ticker: "RUT",
    value: 2072.6,
    change: -0.28,
    trend: "Small caps consolidating",
    movingAverages: { ma10: "below", ma20: "neutral", ma50: "above", ma200: "above" }
  }
];

const trendIndicators = [
  { label: "Short Term", signal: "Bullish", detail: "10MA above 20MA", tone: "positive" },
  { label: "Medium Term", signal: "Constructive", detail: "50MA slope rising", tone: "positive" },
  { label: "Long Term", signal: "Uptrend", detail: "Indices above 200MA", tone: "positive" }
];

const riskIndicators = [
  { label: "Volatility", value: "Moderate", change: "VIX 14.8", tone: "neutral" },
  { label: "Sentiment", value: "Optimistic", change: "Breadth 67%", tone: "positive" },
  { label: "Momentum", value: "Strong", change: "Leaders making highs", tone: "positive" }
];

const leadingSectors = [
  { name: "AI Platforms", score: "+31% YTD" },
  { name: "Semiconductors", score: "+26% YTD" },
  { name: "Energy", score: "+17% YTD" },
  { name: "Space", score: "+14% YTD" },
  { name: "Defense", score: "+12% YTD" },
  { name: "Cybersecurity", score: "+21% YTD" }
];

const heatmapPeriods = ["1W", "1M", "3M", "YTD", "1Y"];
let activeHeatmapPeriod = "YTD";

const heatmapStocks = [
  { ticker: "NVDA", company: "NVIDIA", values: { "1W": 4.8, "1M": 8.9, "3M": 18.5, YTD: 34.2, "1Y": 88.1 } },
  { ticker: "MSFT", company: "Microsoft", values: { "1W": 2.1, "1M": 5.6, "3M": 11.4, YTD: 19.7, "1Y": 42.5 } },
  { ticker: "AMZN", company: "Amazon", values: { "1W": 1.8, "1M": 3.9, "3M": 9.6, YTD: 16.4, "1Y": 36.7 } },
  { ticker: "XOM", company: "Exxon Mobil", values: { "1W": -1.1, "1M": 2.8, "3M": 7.4, YTD: 11.8, "1Y": 14.2 } },
  { ticker: "RTX", company: "RTX", values: { "1W": 0.9, "1M": 4.2, "3M": 8.1, YTD: 13.3, "1Y": 24.9 } }
];

const stockUniverse = [
  ["AAPL", "Apple", "Technology"],
  ["MSFT", "Microsoft", "Technology"],
  ["NVDA", "NVIDIA", "Semiconductors"],
  ["AMZN", "Amazon", "Consumer Discretionary"],
  ["GOOGL", "Alphabet", "Communication Services"],
  ["META", "Meta Platforms", "Communication Services"],
  ["AVGO", "Broadcom", "Semiconductors"],
  ["TSLA", "Tesla", "Consumer Discretionary"],
  ["BRK.B", "Berkshire Hathaway", "Financials"],
  ["JPM", "JPMorgan Chase", "Financials"],
  ["LLY", "Eli Lilly", "Healthcare"],
  ["V", "Visa", "Financials"],
  ["XOM", "Exxon Mobil", "Energy"],
  ["UNH", "UnitedHealth", "Healthcare"],
  ["COST", "Costco", "Consumer Staples"],
  ["MA", "Mastercard", "Financials"],
  ["PG", "Procter & Gamble", "Consumer Staples"],
  ["NFLX", "Netflix", "Communication Services"],
  ["HD", "Home Depot", "Consumer Discretionary"],
  ["ABBV", "AbbVie", "Healthcare"],
  ["BAC", "Bank of America", "Financials"],
  ["KO", "Coca-Cola", "Consumer Staples"],
  ["AMD", "Advanced Micro Devices", "Semiconductors"],
  ["PEP", "PepsiCo", "Consumer Staples"],
  ["ADBE", "Adobe", "Technology"],
  ["CRM", "Salesforce", "Technology"],
  ["WMT", "Walmart", "Consumer Staples"],
  ["MRK", "Merck", "Healthcare"],
  ["TMO", "Thermo Fisher", "Healthcare"],
  ["ACN", "Accenture", "Technology"],
  ["LIN", "Linde", "Materials"],
  ["ORCL", "Oracle", "Technology"],
  ["CSCO", "Cisco", "Technology"],
  ["MCD", "McDonald's", "Consumer Discretionary"],
  ["ABT", "Abbott Laboratories", "Healthcare"],
  ["DHR", "Danaher", "Healthcare"],
  ["VZ", "Verizon", "Communication Services"],
  ["CMCSA", "Comcast", "Communication Services"],
  ["QCOM", "Qualcomm", "Semiconductors"],
  ["INTU", "Intuit", "Technology"],
  ["TXN", "Texas Instruments", "Semiconductors"],
  ["PFE", "Pfizer", "Healthcare"],
  ["IBM", "IBM", "Technology"],
  ["AMGN", "Amgen", "Healthcare"],
  ["NKE", "Nike", "Consumer Discretionary"],
  ["GE", "GE Aerospace", "Industrials"],
  ["CAT", "Caterpillar", "Industrials"],
  ["RTX", "RTX", "Industrials"],
  ["BA", "Boeing", "Industrials"],
  ["HON", "Honeywell", "Industrials"],
  ["LOW", "Lowe's", "Consumer Discretionary"],
  ["PM", "Philip Morris", "Consumer Staples"],
  ["SPGI", "S&P Global", "Financials"],
  ["BKNG", "Booking Holdings", "Consumer Discretionary"],
  ["GS", "Goldman Sachs", "Financials"],
  ["BLK", "BlackRock", "Financials"],
  ["PLTR", "Palantir", "Technology"],
  ["PANW", "Palo Alto Networks", "Technology"],
  ["CRWD", "CrowdStrike", "Technology"],
  ["MU", "Micron Technology", "Semiconductors"],
  ["KLAC", "KLA", "Semiconductors"],
  ["LRCX", "Lam Research", "Semiconductors"],
  ["ADI", "Analog Devices", "Semiconductors"],
  ["ANET", "Arista Networks", "Technology"],
  ["SHOP", "Shopify", "Technology"],
  ["SNOW", "Snowflake", "Technology"],
  ["NOW", "ServiceNow", "Technology"],
  ["UBER", "Uber", "Industrials"],
  ["DE", "Deere & Co.", "Industrials"],
  ["COP", "ConocoPhillips", "Energy"],
  ["SLB", "Schlumberger", "Energy"],
  ["CVX", "Chevron", "Energy"],
  ["MPC", "Marathon Petroleum", "Energy"],
  ["OXY", "Occidental Petroleum", "Energy"],
  ["NEE", "NextEra Energy", "Utilities"],
  ["SO", "Southern Company", "Utilities"],
  ["DUK", "Duke Energy", "Utilities"],
  ["AMT", "American Tower", "Real Estate"],
  ["PLD", "Prologis", "Real Estate"],
  ["EQIX", "Equinix", "Real Estate"],
  ["PSA", "Public Storage", "Real Estate"],
  ["ISRG", "Intuitive Surgical", "Healthcare"],
  ["SYK", "Stryker", "Healthcare"],
  ["MDT", "Medtronic", "Healthcare"],
  ["VRTX", "Vertex Pharmaceuticals", "Healthcare"],
  ["REGN", "Regeneron", "Healthcare"],
  ["INTC", "Intel", "Semiconductors"],
  ["ARM", "Arm Holdings", "Semiconductors"],
  ["ASML", "ASML", "Semiconductors"],
  ["SMCI", "Super Micro Computer", "Technology"],
  ["ADIY", "Adyen", "Financials"],
  ["SQ", "Block", "Financials"],
  ["PYPL", "PayPal", "Financials"],
  ["COIN", "Coinbase", "Financials"],
  ["SNPS", "Synopsys", "Technology"],
  ["CDNS", "Cadence Design Systems", "Technology"],
  ["APH", "Amphenol", "Technology"],
  ["TT", "Trane Technologies", "Industrials"],
  ["ETN", "Eaton", "Industrials"],
  ["PH", "Parker-Hannifin", "Industrials"],
  ["ROK", "Rockwell Automation", "Industrials"],
  ["LMT", "Lockheed Martin", "Industrials"],
  ["NOC", "Northrop Grumman", "Industrials"],
  ["GD", "General Dynamics", "Industrials"],
  ["AXON", "Axon Enterprise", "Industrials"],
  ["RKLB", "Rocket Lab", "Industrials"],
  ["SPCE", "Virgin Galactic", "Industrials"],
  ["FSLR", "First Solar", "Energy"],
  ["ENPH", "Enphase Energy", "Energy"],
  ["SEDG", "SolarEdge", "Energy"],
  ["CEG", "Constellation Energy", "Utilities"],
  ["MRVL", "Marvell Technology", "Semiconductors"],
  ["ON", "ON Semiconductor", "Semiconductors"],
  ["WDAY", "Workday", "Technology"],
  ["DDOG", "Datadog", "Technology"],
  ["NET", "Cloudflare", "Technology"],
  ["ZS", "Zscaler", "Technology"],
  ["MDB", "MongoDB", "Technology"],
  ["TEAM", "Atlassian", "Technology"],
  ["MELI", "MercadoLibre", "Consumer Discretionary"],
  ["RCL", "Royal Caribbean", "Consumer Discretionary"],
  ["DIS", "Disney", "Communication Services"],
  ["TTD", "Trade Desk", "Communication Services"],
  ["EA", "Electronic Arts", "Communication Services"]
];

const marketCaps = ["38B", "52B", "66B", "79B", "94B", "108B", "124B", "142B", "158B", "176B", "194B", "220B", "248B", "275B", "320B", "388B", "420B", "510B", "640B", "890B", "1.2T", "1.8T", "2.4T", "3.0T"];

const watchlistStorageKey = "bluewave-watchlist";
const loginStorageKey = "bluewave-auth";

function toMarketCapNumber(value) {
  const suffix = value.slice(-1);
  const numeric = Number.parseFloat(value);
  if (suffix === "T") return numeric * 1000;
  return numeric;
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2
  }).format(value);
}

function formatPercent(value) {
  return `${value > 0 ? "+" : ""}${value.toFixed(2)}%`;
}

function createSparkData(index) {
  const values = [];
  let point = 40 + (index % 9) * 4;
  for (let i = 0; i < 24; i += 1) {
    point += ((i % 5) - 2) * 1.4 + ((index % 7) - 3) * 0.16 + Math.sin((i + index) / 3) * 1.8;
    values.push(Number(point.toFixed(2)));
  }
  return values;
}

function buildStockData() {
  return stockUniverse.map(([ticker, company, sector], index) => {
    const base = 42 + index * 6.9;
    const price = Number((base + ((index % 11) * 13.4) + (Math.sin(index) * 19.7)).toFixed(2));
    const pe = Number((12 + (index % 17) * 1.8 + ((index % 3) * 0.9)).toFixed(1));
    const eps = Number((price / pe).toFixed(2));
    const ytd = Number((((index % 19) - 6) * 4.2 + Math.sin(index / 2) * 6.5).toFixed(2));
    const high52 = Number((price * (1.06 + (index % 6) * 0.04)).toFixed(2));
    const low52 = Number((price * (0.62 + (index % 5) * 0.05)).toFixed(2));
    const dividendYield = Number(((index % 8 === 0 ? 0 : (index % 9) * 0.38)).toFixed(2));
    const marketCap = marketCaps[index % marketCaps.length];
    const spark = createSparkData(index);
    return {
      ticker,
      company,
      sector,
      price,
      marketCap,
      marketCapValue: toMarketCapNumber(marketCap),
      pe,
      eps,
      ytd,
      high52,
      low52,
      dividendYield,
      spark
    };
  });
}

const stocks = buildStockData();

const state = {
  stocks,
  search: "",
  sector: "all",
  performance: "all",
  marketCap: "all",
  watchlist: new Set(JSON.parse(localStorage.getItem(watchlistStorageKey) || "[]")),
  loggedIn: JSON.parse(localStorage.getItem(loginStorageKey) || "false")
};

const marketOverviewEl = document.getElementById("marketOverview");
const marketOverviewNoteEl = document.getElementById("marketOverviewNote");
const trendIndicatorsEl = document.getElementById("trendIndicators");
const riskIndicatorsEl = document.getElementById("riskIndicators");
const leadingSectorsEl = document.getElementById("leadingSectors");
const heatmapGridEl = document.getElementById("heatmapGrid");
const heatmapPeriodsEl = document.getElementById("heatmapPeriods");
const stockTableBodyEl = document.getElementById("stockTableBody");
const watchlistSummaryEl = document.getElementById("watchlistSummary");
const sectorFilterEl = document.getElementById("sectorFilter");
const searchInputEl = document.getElementById("searchInput");
const performanceFilterEl = document.getElementById("performanceFilter");
const marketCapFilterEl = document.getElementById("marketCapFilter");
const loginToggleEl = document.getElementById("loginToggle");

function saveWatchlist() {
  localStorage.setItem(watchlistStorageKey, JSON.stringify([...state.watchlist]));
}

function saveLoginState() {
  localStorage.setItem(loginStorageKey, JSON.stringify(state.loggedIn));
}

function renderMarketOverview(overview = defaultIndexOverview) {
  marketOverviewEl.innerHTML = overview
    .map((item) => {
      const maMarkup = Object.entries(item.movingAverages)
        .map(([key, status]) => {
          const label = `${key.replace("ma", "")}MA`;
          return `<span class="ma-pill ${status}">${label}: ${status}</span>`;
        })
        .join("");

      return `
        <article class="overview-item">
          <div class="overview-top">
            <div class="overview-name">
              <strong>${item.name}</strong>
              <span>${item.ticker} • ${item.trend}</span>
            </div>
            <div class="value-stack">
              <strong>${item.value.toLocaleString("en-US")}</strong>
              <span class="${item.change >= 0 ? "positive" : "negative"}">${formatPercent(item.change)}</span>
            </div>
          </div>
          <div class="overview-ma">${maMarkup}</div>
        </article>
      `;
    })
    .join("");
}

async function hydrateMarketOverview() {
  try {
    const response = await fetch("/api/market-overview");
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const payload = await response.json();
    renderMarketOverview(payload.overview || defaultIndexOverview);

    if (marketOverviewNoteEl) {
      const sourceLabel =
        payload.source === "alpha-vantage" ? "Live via Alpha Vantage proxy" : "Demo fallback mode";
      marketOverviewNoteEl.textContent = `${sourceLabel}. ${payload.note || ""}`.trim();
    }
  } catch (error) {
    renderMarketOverview(defaultIndexOverview);
    if (marketOverviewNoteEl) {
      marketOverviewNoteEl.textContent = `Unable to load backend market data right now. Showing demo values. ${error.message}`;
    }
  }
}

function renderIndicators() {
  trendIndicatorsEl.innerHTML = trendIndicators
    .map(
      (item) => `
        <article class="trend-row">
          <span class="card-kicker">${item.label}</span>
          <strong>${item.signal}</strong>
          <span class="${item.tone}">${item.detail}</span>
        </article>
      `
    )
    .join("");

  riskIndicatorsEl.innerHTML = riskIndicators
    .map(
      (item) => `
        <article class="risk-metric">
          <span class="card-kicker">${item.label}</span>
          <strong>${item.value}</strong>
          <span class="${item.tone}">${item.change}</span>
        </article>
      `
    )
    .join("");
}

function renderLeadingSectors() {
  leadingSectorsEl.innerHTML = leadingSectors
    .map(
      (item) => `
        <article class="sector-pill">
          <strong>${item.name}</strong>
          <span class="positive">${item.score}</span>
        </article>
      `
    )
    .join("");
}

function renderHeatmap() {
  heatmapPeriodsEl.innerHTML = heatmapPeriods
    .map(
      (period) => `
        <button class="heatmap-chip ${period === activeHeatmapPeriod ? "active" : ""}" data-period="${period}" type="button">
          ${period}
        </button>
      `
    )
    .join("");

  heatmapGridEl.innerHTML = heatmapStocks
    .map((stock) => {
      const value = stock.values[activeHeatmapPeriod];
      const tone = value >= 0 ? "positive" : "negative";
      return `
        <article class="mini-heatmap ${tone}">
          <div>
            <span class="card-kicker">${stock.ticker}</span>
            <strong>${stock.company}</strong>
          </div>
          <div>
            <strong class="${tone}">${formatPercent(value)}</strong>
            <div>${activeHeatmapPeriod} return</div>
          </div>
        </article>
      `;
    })
    .join("");

  heatmapPeriodsEl.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      activeHeatmapPeriod = button.dataset.period;
      renderHeatmap();
    });
  });
}

function buildSectorOptions() {
  const sectors = ["all", ...new Set(stocks.map((stock) => stock.sector))];
  sectorFilterEl.innerHTML = sectors
    .map((sector) => `<option value="${sector}">${sector === "all" ? "All sectors" : sector}</option>`)
    .join("");
}

function getFilteredStocks() {
  return state.stocks.filter((stock) => {
    const keyword = state.search.trim().toLowerCase();
    const matchesKeyword =
      keyword.length === 0 ||
      stock.ticker.toLowerCase().includes(keyword) ||
      stock.company.toLowerCase().includes(keyword) ||
      stock.sector.toLowerCase().includes(keyword);

    const matchesSector = state.sector === "all" || stock.sector === state.sector;

    let matchesPerformance = true;
    if (state.performance === "leaders") matchesPerformance = stock.ytd > 20;
    if (state.performance === "positive") matchesPerformance = stock.ytd > 0;
    if (state.performance === "laggards") matchesPerformance = stock.ytd < 0;

    let matchesMarketCap = true;
    if (state.marketCap === "mega") matchesMarketCap = stock.marketCapValue >= 200;
    if (state.marketCap === "large") matchesMarketCap = stock.marketCapValue >= 50;
    if (state.marketCap === "mid") matchesMarketCap = stock.marketCapValue < 50;

    return matchesKeyword && matchesSector && matchesPerformance && matchesMarketCap;
  });
}

function makeSparkline(values, positiveTrend) {
  const width = 124;
  const height = 38;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const points = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width;
      const y = height - ((value - min) / range) * (height - 4) - 2;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");

  const lineColor = positiveTrend ? "#119a66" : "#dc4d64";
  const area = `M 0 ${height} L ${points.replace(/ /g, " L ")} L ${width} ${height} Z`;

  return `
    <svg class="sparkline" viewBox="0 0 ${width} ${height}" aria-hidden="true">
      <path class="fill" d="${area}" fill="${lineColor}"></path>
      <polyline class="line" points="${points}" stroke="${lineColor}" fill="none"></polyline>
    </svg>
  `;
}

function renderWatchlistSummary(filtered) {
  const total = state.watchlist.size;
  const loggedInText = state.loggedIn ? "Watchlist enabled" : "Log in to save";
  watchlistSummaryEl.innerHTML = `
    <span class="watchlist-badge">${filtered.length} stocks shown</span>
    <span class="watchlist-badge">${total} in watchlist</span>
    <span class="watchlist-badge">${loggedInText}</span>
  `;
}

function renderTable() {
  const filtered = getFilteredStocks();
  renderWatchlistSummary(filtered);

  if (filtered.length === 0) {
    stockTableBodyEl.innerHTML = `
      <tr class="empty-state">
        <td colspan="12">No stocks found matching your criteria.</td>
      </tr>
    `;
    return;
  }

  stockTableBodyEl.innerHTML = filtered
    .map((stock) => {
      const watching = state.watchlist.has(stock.ticker);
      const positiveTrend = stock.ytd >= 0;
      return `
        <tr>
          <td class="ticker-cell">
            <strong>${stock.ticker}</strong>
          </td>
          <td class="company-cell">
            <strong>${stock.company}</strong>
          </td>
          <td>${formatCurrency(stock.price)}</td>
          <td>${stock.marketCap}</td>
          <td>${stock.pe.toFixed(1)}</td>
          <td>${stock.eps.toFixed(2)}</td>
          <td class="${positiveTrend ? "positive" : "negative"}">${formatPercent(stock.ytd)}</td>
          <td class="range-cell">
            <strong>${formatCurrency(stock.low52)} - ${formatCurrency(stock.high52)}</strong>
            <small>52-week low/high</small>
          </td>
          <td>${stock.dividendYield.toFixed(2)}%</td>
          <td>${stock.sector}</td>
          <td class="spark-cell">
            ${makeSparkline(stock.spark, positiveTrend)}
            <small>1Y trend</small>
          </td>
          <td>
            <button class="watch-button ${watching ? "active" : ""}" data-ticker="${stock.ticker}" type="button">
              ${watching ? "Watching" : "Add"}
            </button>
          </td>
        </tr>
      `;
    })
    .join("");

  stockTableBodyEl.querySelectorAll(".watch-button").forEach((button) => {
    button.addEventListener("click", () => {
      const { ticker } = button.dataset;
      if (!state.loggedIn) {
        state.loggedIn = true;
        saveLoginState();
        loginToggleEl.textContent = "Logged in";
      }

      if (state.watchlist.has(ticker)) {
        state.watchlist.delete(ticker);
      } else {
        state.watchlist.add(ticker);
      }

      saveWatchlist();
      renderTable();
    });
  });
}

function bindFilters() {
  searchInputEl.addEventListener("input", (event) => {
    state.search = event.target.value;
    renderTable();
  });

  sectorFilterEl.addEventListener("change", (event) => {
    state.sector = event.target.value;
    renderTable();
  });

  performanceFilterEl.addEventListener("change", (event) => {
    state.performance = event.target.value;
    renderTable();
  });

  marketCapFilterEl.addEventListener("change", (event) => {
    state.marketCap = event.target.value;
    renderTable();
  });

  loginToggleEl.addEventListener("click", () => {
    state.loggedIn = !state.loggedIn;
    saveLoginState();
    loginToggleEl.textContent = state.loggedIn ? "Logged in" : "Log in";
    renderTable();
  });
}

function init() {
  loginToggleEl.textContent = state.loggedIn ? "Logged in" : "Log in";
  renderMarketOverview();
  renderIndicators();
  renderLeadingSectors();
  renderHeatmap();
  buildSectorOptions();
  bindFilters();
  renderTable();
  hydrateMarketOverview();
}

init();
