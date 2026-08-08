<div align="center">
    <h1>Secret Terminal</h1>
</div>

## Getting Started

A simple coin app with live prices, coin insights, watchlists, and news.

- Visit our app [Secret Terminal](secretterminal.com).

## Features
- Market overview of major coins
- Coin table displaying price, 24-hour price change, trading volume, and market capitalization
- Price, volume, and market cap graphs for various time periods.
- Search coins by name or symbol.
- Watchlist and news

## Screenshot
![Screenshot](public/screen-one.png)

## Tech Stack
- **Framework:** Next.js
- **Library:** React
- **Language:** Javascript, TypeScript
- **Styling:** Tailwind CSS
- **API's:** CoinGecko, Binance, Secret Terminal
- **DB & ORM:** NeonDB, PostgreSQL, Prisma
- **Deployment:** Vercel, Render

## API's Used

- <b>CoinGecko:</b> Used for trending and server side coin list, searching, coin details and for coin analysis.
- <b>Binance:</b> Used for top gainers, losers and volume data.
- <b>Secret Terminal:</b> Used for news and watchlist.

## Installation & Setup

To run the project locally, follow these steps:

```bash
### Prerequisites

- You must have a CoinGecko account to obtain an API key.

### Steps

# Clone the repository
git clone https://github.com/shubhamtak007/secret-terminal.git

# Navigate to the project directory
cd secret-terminal

# Install dependencies
npm install

# Add your API key to .env.development and .env.production
COIN_GECKO_API_KEY=your_api_key_here

# Start the development server
npm run dev
```

## License
Secret Terminal is [MIT licensed](./LICENSE).
