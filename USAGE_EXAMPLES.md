# Usage Examples

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Visit `http://localhost:3000` to see the dashboard.

## Example 1: Using Individual Components

```tsx
import React from 'react';
import { AccountOverviewCard } from './components/AccountOverviewCard';
import { InvestmentPieChart } from './components/InvestmentPieChart';
import { PerformanceChart } from './components/PerformanceChart';

function MyPortfolio() {
  return (
    <div className="p-8 space-y-6">
      {/* Account Overview */}
      <AccountOverviewCard
        accountValue={10250.75}
        last24hChange={125.50}
        last24hPercentage={1.24}
        rateOfReturn={12.5}
      />

      {/* Performance Chart */}
      <PerformanceChart
        data={{
          '1D': [
            { date: '9:00', value: 10100 },
            { date: '12:00', value: 10150 },
            { date: '15:00', value: 10200 },
            { date: '18:00', value: 10250 }
          ],
          'M': [/* monthly data */],
          '3M': [/* quarterly data */],
          'YTD': [/* year-to-date data */],
          'Y': [/* yearly data */],
          'MAX': [/* all-time data */]
        }}
        currentValue={10250.75}
      />

      {/* Investment Pie */}
      <InvestmentPieChart
        pieName="Tech Portfolio"
        totalValue={8500.50}
        holdings={[
          { ticker: 'AAPL', percentage: 25, value: 2125.13, color: '#d5e9d6' },
          { ticker: 'MSFT', percentage: 20, value: 1700.10, color: '#f0dcde' },
          { ticker: 'GOOGL', percentage: 18, value: 1530.09, color: '#d5e9d7' },
          { ticker: 'AMZN', percentage: 15, value: 1275.08, color: '#f0dadc' },
          { ticker: 'META', percentage: 12, value: 1020.06, color: '#cce8d4' },
          { ticker: 'Others', percentage: 10, value: 850.04, color: '#e5e7eb' }
        ]}
        totalChange={425.25}
        totalChangePercentage={5.26}
        numHoldings={6}
      />
    </div>
  );
}
```

## Example 2: Fetching Real Data

```tsx
import React, { useState, useEffect } from 'react';
import { AccountOverviewCard } from './components/AccountOverviewCard';

function LiveAccountCard() {
  const [accountData, setAccountData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/account');
        const data = await response.json();
        setAccountData(data);
      } catch (error) {
        console.error('Failed to fetch account data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    // Poll for updates every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="animate-pulse">Loading...</div>;
  }

  return (
    <AccountOverviewCard
      accountValue={accountData.value}
      last24hChange={accountData.change24h}
      last24hPercentage={accountData.changePercent24h}
      rateOfReturn={accountData.totalReturn}
    />
  );
}
```

## Example 3: Interactive Performance Chart with Custom Data

```tsx
import React, { useState } from 'react';
import { PerformanceChart } from './components/PerformanceChart';

function AdvancedPerformance() {
  const [selectedStock, setSelectedStock] = useState('AAPL');

  // Generate sample data for different stocks
  const stockData = {
    AAPL: {
      '1D': generateDayData(175),
      'M': generateMonthData(175),
      '3M': generateQuarterData(175),
      'YTD': generateYTDData(175),
      'Y': generateYearData(175),
      'MAX': generateMaxData(175)
    },
    MSFT: {
      '1D': generateDayData(380),
      'M': generateMonthData(380),
      '3M': generateQuarterData(380),
      'YTD': generateYTDData(380),
      'Y': generateYearData(380),
      'MAX': generateMaxData(380)
    }
  };

  return (
    <div>
      {/* Stock Selector */}
      <div className="mb-4">
        <select
          value={selectedStock}
          onChange={(e) => setSelectedStock(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          <option value="AAPL">Apple Inc.</option>
          <option value="MSFT">Microsoft Corp.</option>
        </select>
      </div>

      {/* Chart */}
      <PerformanceChart
        data={stockData[selectedStock]}
        currentValue={stockData[selectedStock]['1D'].slice(-1)[0].value}
      />
    </div>
  );
}

function generateDayData(baseValue) {
  return Array.from({ length: 24 }, (_, i) => ({
    date: `${i}:00`,
    value: baseValue + (Math.random() - 0.5) * 5
  }));
}

function generateMonthData(baseValue) {
  return Array.from({ length: 30 }, (_, i) => ({
    date: `Day ${i + 1}`,
    value: baseValue + (Math.random() - 0.5) * 15
  }));
}

// ... implement other generate functions
```

## Example 4: Custom Pie Chart Colors

```tsx
import React from 'react';
import { InvestmentPieChart } from './components/InvestmentPieChart';

// Define a custom color palette
const colorPalette = [
  '#FF6B6B', // Red
  '#4ECDC4', // Teal
  '#45B7D1', // Blue
  '#FFA07A', // Salmon
  '#98D8C8', // Mint
  '#F7DC6F', // Yellow
  '#BB8FCE', // Purple
  '#85C1E2', // Sky Blue
];

function CustomColoredPie() {
  const holdings = [
    { ticker: 'TECH', percentage: 30, value: 3000, color: colorPalette[0] },
    { ticker: 'HEALTH', percentage: 25, value: 2500, color: colorPalette[1] },
    { ticker: 'FINANCE', percentage: 20, value: 2000, color: colorPalette[2] },
    { ticker: 'ENERGY', percentage: 15, value: 1500, color: colorPalette[3] },
    { ticker: 'CONSUMER', percentage: 10, value: 1000, color: colorPalette[4] }
  ];

  return (
    <InvestmentPieChart
      pieName="Sector Allocation"
      totalValue={10000}
      holdings={holdings}
      totalChange={500}
      totalChangePercentage={5.26}
      numHoldings={5}
    />
  );
}
```

## Example 5: Multi-Portfolio Dashboard

```tsx
import React from 'react';
import { InvestmentPieChart } from './components/InvestmentPieChart';

function MultiPortfolio() {
  const portfolios = [
    {
      name: 'Growth Portfolio',
      value: 15000,
      change: 750,
      changePercent: 5.26,
      holdings: [/* ... */]
    },
    {
      name: 'Income Portfolio',
      value: 12000,
      change: 240,
      changePercent: 2.04,
      holdings: [/* ... */]
    },
    {
      name: 'Balanced Portfolio',
      value: 20000,
      change: -400,
      changePercent: -1.96,
      holdings: [/* ... */]
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
      {portfolios.map((portfolio, index) => (
        <InvestmentPieChart
          key={index}
          pieName={portfolio.name}
          totalValue={portfolio.value}
          holdings={portfolio.holdings}
          totalChange={portfolio.change}
          totalChangePercentage={portfolio.changePercent}
          numHoldings={portfolio.holdings.length}
        />
      ))}
    </div>
  );
}
```

## Example 6: WebSocket Real-Time Updates

```tsx
import React, { useState, useEffect } from 'react';
import { AccountOverviewCard } from './components/AccountOverviewCard';

function RealtimeAccount() {
  const [accountData, setAccountData] = useState({
    accountValue: 0,
    last24hChange: 0,
    last24hPercentage: 0,
    rateOfReturn: 0
  });

  useEffect(() => {
    const ws = new WebSocket('wss://your-api.com/account-updates');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setAccountData({
        accountValue: data.currentValue,
        last24hChange: data.change24h,
        last24hPercentage: data.changePercent24h,
        rateOfReturn: data.totalReturn
      });
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.close();
    };
  }, []);

  return <AccountOverviewCard {...accountData} />;
}
```

## Tips & Best Practices

### 1. Data Caching
Cache API responses to reduce load times:

```tsx
import { useState, useEffect } from 'react';

function useChartData(period) {
  const [data, setData] = useState(() => {
    // Try to load from cache first
    const cached = localStorage.getItem(`chart-${period}`);
    return cached ? JSON.parse(cached) : null;
  });

  useEffect(() => {
    if (data) return; // Use cached data

    fetch(`/api/performance?period=${period}`)
      .then(res => res.json())
      .then(newData => {
        setData(newData);
        localStorage.setItem(`chart-${period}`, JSON.stringify(newData));
      });
  }, [period, data]);

  return data;
}
```

### 2. Error Handling
Always handle errors gracefully:

```tsx
function SafeAccountCard() {
  const [error, setError] = useState(null);

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded p-4">
        <p className="text-red-800">Failed to load account data</p>
        <button onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  return <AccountOverviewCard {...props} />;
}
```

### 3. Loading States
Show loading indicators:

```tsx
function LoadingCard() {
  return (
    <div className="bg-white rounded-lg p-6 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
      <div className="h-12 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
}
```

### 4. Responsive Design
Adjust for mobile:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Components will stack on mobile, show 2 columns on tablet, 3 on desktop */}
</div>
```
