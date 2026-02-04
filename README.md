# Coinova 🚀

Coinova is a modern, real-time cryptocurrency dashboard that helps users track market trends and major coins through a clean and responsive interface.

## 🌐 Live Demo
https://coinova-app.vercel.app/

---

## 📌 Features
- Market overview of major cryptocurrencies
- Coins table displaying price, 24-hour change, volume, and market capitalization
- Real-time price updates
- Fully responsive layout for desktop and mobile devices
- Fast and lightweight user experience

---

## 🖼 Screenshot
![Dashboard Screenshot](public/screen-one.png)

---

## 🛠 Tech Stack
- **Framework:** Next.js
- **Library:** React
- **Language:** Javascript, TypeScript
- **Styling:** Tailwind CSS
- **APIs:** CoinGecko, Binance
- **Deployment:** Vercel

---

## 🔗 APIs Used
- **CoinGecko API**
  Used for global market statistics, trending coins, and general cryptocurrency data.

- **Binance API**
  Used for real-time price updates and volume-related market data.

---

## ⚙️ Installation & Setup

To run the project locally, follow these steps:

```bash
### Prerequisites

- You must have a CoinGecko account to obtain an API key.

### Steps

# Clone the repository
git clone https://github.com/shubhamtak007/coinova.git

# Navigate to the project directory
cd coinova

# Install dependencies
npm install

# Create a .env.local file in the root directory
touch .env.local

# Add your API key to .env.local
COIN_GECKO_API_KEY=your_api_key_here

# Start the development server
npm run dev
```

## License
Coinova is [MIT licensed](./LICENSE).
