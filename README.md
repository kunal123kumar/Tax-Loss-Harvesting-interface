# 🪙 Tax-Loss-Harvesting-Interface

> A smart, interactive Tax Loss Harvesting UI built with **React + Vite + TailwindCSS** — helping crypto investors identify unrealized losses and strategically offset taxable capital gains.

🔗 **Live Demo:** [https://tax-loss-harvesting-interface-2.onrender.com](https://tax-loss-harvesting-interface-2.onrender.com)

---

## 📸 Screenshots

<img src="https://github.com/kunal123kumar/Tax-Loss-Harvesting-interface/blob/main/home.jpg?raw=true" alt="Home Desktop" width="800" />

<img src="https://github.com/kunal123kumar/Tax-Loss-Harvesting-interface/blob/main/home2.jpg?raw=true" alt="Holdings Table" width="800" />

<img src="https://github.com/kunal123kumar/Tax-Loss-Harvesting-interface/blob/main/home3.jpg?raw=true" alt="Mobile View" width="400" />

---

## 🧠 What Is Tax Loss Harvesting?

**Tax Loss Harvesting** is a strategy where investors sell assets at a loss to offset realized capital gains, thereby reducing their overall tax liability.

This interface helps users:
- View their **Pre-Harvesting** capital gains (short-term & long-term)
- Simulate **After-Harvesting** scenarios by selecting losing positions
- Understand the **effective capital gains** reduction in real-time
- Identify which holdings contribute losses that can offset gains

---

## ✨ Features

- 📊 **Pre vs After Harvesting Comparison** — Side-by-side summary cards
- ✅ **Interactive Holdings Table** — Select assets to include in harvesting
- 🔴🟢 **Color-coded Gains/Losses** — Instantly identify profitable vs losing positions
- 📱 **Fully Responsive** — Works on mobile, tablet, and desktop
- 🌙 **Dark/Light Mode Toggle**
- 📋 **Disclaimer Accordion** — Collapsible important notes section
- ⚡ **Real-time Calculation Updates** — Effective capital gains update as you select assets

---

## 🗂️ Project Structure

```
Harvesting/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── App.jsx                        # Root component, theme state
│   ├── main.jsx                       # Entry point
│   ├── index.css                      # Global styles
│   ├── Components/
│   │   ├── Header.jsx                 # KoinX logo + Light/Dark toggle
│   │   ├── DisclaimerAccordion.jsx    # Collapsible disclaimer section
│   │   ├── TaxHarvestingDashboard.jsx # Main dashboard with pre/after cards
│   │   └── TaxHarvestingHeader.jsx    # "Tax Harvesting" title + how it works link
│   ├── Pages/
│   │   └── TaxHarvestingPage.jsx      # Full page layout assembling all components
│   ├── Data/
│   │   └── HoldingData.json           # Static holdings data (asset, gains, quantities)
│   └── assets/
│       └── hero.png
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/kunal123kumar/Tax-Loss-Harvesting-interface.git

# 2. Navigate into the project directory
cd Tax-Loss-Harvesting-interface

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be running at **http://localhost:5173**

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## 🛠️ Tech Stack

| Technology     | Purpose                          |
|----------------|----------------------------------|
| React 18       | UI component framework           |
| Vite           | Fast build tool & dev server     |
| Tailwind CSS   | Utility-first styling            |
| JavaScript ES6 | Application logic                |

---

## 📦 Deployment

This project is deployed on **Render**.

🔗 [https://tax-loss-harvesting-interface-2.onrender.com](https://tax-loss-harvesting-interface-2.onrender.com)

---

## 📐 Assumptions

- **Holdings data is static** — loaded from `src/Data/HoldingData.json`. In production, this would be fetched from a live portfolio API.
- **Tax calculations are simplified** — Short-term and long-term gains/losses are pre-computed in the data file. Real-world tools would calculate these dynamically based on purchase dates and cost basis.
- **"Amount to Sell" column** — Currently displays `—` as a placeholder. This would be populated once the user selects an asset for harvesting.
- **Currency is USD** — All monetary values are displayed in US dollars.
- **No authentication** — The app is a front-end only demo; no user login or portfolio sync is implemented.
- **After Harvesting card** — Updates in real-time based on which assets are checked in the Holdings table.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.



<p align="center">Built with ❤️ for smarter crypto tax management</p>
