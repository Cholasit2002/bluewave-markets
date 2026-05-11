# BlueWave Markets

White-and-blue market dashboard with a landing page, market overview cards, heatmap, stock screener, sparkline charts, and a secure backend proxy for Alpha Vantage.

## What is included

- Landing page with CTA to the dashboard
- Market overview for `S&P 500`, `Nasdaq 100`, and `Russell 2000`
- Moving average status for `10MA`, `20MA`, `50MA`, and `200MA`
- Trend indicators, risk indicators, and leading sectors
- Stock screener with 100+ symbols, filters, search, and local watchlist
- Backend proxy that keeps the Alpha Vantage API key out of the browser

## Local run

1. Copy `.env.example` to `.env`
2. Set `ALPHA_VANTAGE_API_KEY`
3. Run:

```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000)

## Deploy to Render

This project includes `render.yaml`, so Render can detect the service automatically.

### Steps

1. Push this project to a GitHub repository
2. In Render, choose `New +` -> `Blueprint`
3. Connect the GitHub repository
4. Render will read `render.yaml`
5. Add environment variable:

```text
ALPHA_VANTAGE_API_KEY=your_real_key
```

6. Click deploy

## Important note about Alpha Vantage free tier

- The backend caches market overview responses for 6 hours
- Requests are spaced to respect the free-tier burst limit
- Major indices are approximated with ETF proxies:
  - `SPY` for `S&P 500`
  - `QQQ` for `Nasdaq 100`
  - `IWM` for `Russell 2000`

## Production considerations

- Move watchlist storage from `localStorage` to a real database
- Add real authentication for user accounts
- Replace mock screener fundamentals with a dedicated market-data source
- Add error logging and analytics
