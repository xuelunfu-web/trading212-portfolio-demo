# Quick Start Guide

Get your Stocks ISA Dashboard up and running in 5 minutes!

## 🚀 Installation

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```

Open http://localhost:3000 in your browser.

## 📁 Project Structure

```
sharon-codes/
├── src/
│   ├── components/
│   │   ├── AccountOverviewCard.tsx      # Account value & returns
│   │   ├── InvestmentPieChart.tsx       # Portfolio breakdown
│   │   ├── PerformanceChart.tsx         # Historical performance
│   │   └── StocksISAScreen.tsx          # Main dashboard
│   ├── types/
│   │   └── index.ts                     # TypeScript definitions
│   ├── App.tsx                          # App entry point
│   ├── App.css                          # Global styles
│   └── main.tsx                         # React entry point
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🎯 Key Components

### 1. AccountOverviewCard
Shows current account value and performance metrics.

```tsx
import { AccountOverviewCard } from './components/AccountOverviewCard';

<AccountOverviewCard
  accountValue={623.03}
  last24hChange={-1.23}
  last24hPercentage={-0.2}
  rateOfReturn={-7.7}
/>
```

### 2. InvestmentPieChart
Interactive pie chart showing portfolio allocation.

```tsx
import { InvestmentPieChart } from './components/InvestmentPieChart';

<InvestmentPieChart
  pieName="Tech Portfolio"
  totalValue={620.71}
  holdings={[
    { ticker: 'NVDA', percentage: 15.5, value: 96.21, color: '#f0dcde' },
    // ... more holdings
  ]}
  totalChange={-99.63}
  totalChangePercentage={-13.86}
  numHoldings={12}
/>
```

### 3. PerformanceChart
Line chart with time period filters.

```tsx
import { PerformanceChart } from './components/PerformanceChart';

<PerformanceChart
  data={{
    '1D': [{ date: '9:00', value: 620 }, ...],
    'M': [...],
    // ... other periods
  }}
  currentValue={623.03}
/>
```

## 🎨 Customization

### Change Colors
Edit `tailwind.config.js`:

```js
colors: {
  primary: {
    blue: '#4aa5da',  // Your brand color
    red: '#d95853',   // Negative values color
  }
}
```

### Adjust Font Sizes
Update in component files or tailwind config.

## 📊 Adding Real Data

Replace mock data in `StocksISAScreen.tsx`:

```tsx
// Before (mock data)
const data = generateMockData();

// After (real API)
const [data, setData] = useState(null);

useEffect(() => {
  fetch('/api/account')
    .then(res => res.json())
    .then(setData);
}, []);
```

## 🔧 Common Tasks

### Add New Time Period to Chart
Edit `PerformanceChart.tsx`:

```tsx
type TimePeriod = '1D' | 'M' | '3M' | 'YTD' | 'Y' | 'MAX' | '5Y'; // Add '5Y'

const periods: TimePeriod[] = ['1D', 'M', '3M', 'YTD', 'Y', '5Y', 'MAX'];
```

### Change Pie Chart Size
Edit `InvestmentPieChart.tsx`:

```tsx
const center = 150;  // Default: 100
const radius = 120;  // Default: 80
```

### Add Loading State
```tsx
{loading ? (
  <div className="animate-pulse">Loading...</div>
) : (
  <AccountOverviewCard {...data} />
)}
```

## 🐛 Troubleshooting

### Port 3000 Already in Use
Edit `vite.config.ts`:
```ts
server: {
  port: 3001  // Change to any available port
}
```

### Tailwind Styles Not Working
1. Check `src/App.css` has the imports
2. Verify `tailwind.config.js` content paths
3. Restart dev server

### TypeScript Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📱 Deploy to Production

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Deploy dist/ folder to your hosting service
```

Compatible with:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting

## 🎓 Next Steps

1. **Read the full documentation:** `README.md`
2. **See more examples:** `USAGE_EXAMPLES.md`
3. **Connect to your API:** Replace mock data
4. **Customize colors & fonts:** Edit config files
5. **Add authentication:** Integrate with your auth provider

## 💡 Tips

- Use the browser DevTools to inspect component props
- All charts are fully interactive - hover to see details
- Components are responsive by default
- Data updates happen every 5 seconds (configurable)

## 🆘 Need Help?

- Check `README.md` for detailed API documentation
- See `USAGE_EXAMPLES.md` for code examples
- Open an issue on GitHub

Happy coding! 🚀
