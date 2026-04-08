import React, { useState, useEffect } from 'react';
import { AccountOverviewCard } from './AccountOverviewCard';
import { InvestmentPieChart } from './InvestmentPieChart';
import { PerformanceChart } from './PerformanceChart';

// Sample data - replace with real API calls
const generateMockData = () => {
  return {
    accountValue: 623.03,
    last24hChange: -1.23,
    last24hPercentage: -0.2,
    rateOfReturn: -7.7,

    pies: [
      {
        pieName: 'Copy of 2025 AI Stocks - Main',
        totalValue: 620.71,
        totalChange: -99.63,
        totalChangePercentage: -13.86,
        numHoldings: 12,
        holdings: [
          { ticker: 'NVDA', percentage: 15.5, value: 96.21, color: '#f0dcde' },
          { ticker: 'MSFT', percentage: 12.3, value: 76.35, color: '#d5e9d6' },
          { ticker: 'AAPL', percentage: 10.2, value: 63.31, color: '#f0dadc' },
          { ticker: 'GOOGL', percentage: 8.7, value: 54.00, color: '#d5e9d7' },
          { ticker: 'AMZN', percentage: 7.5, value: 46.55, color: '#f0dbdd' },
          { ticker: 'TSLA', percentage: 6.8, value: 42.21, color: '#cce8d4' },
          { ticker: 'META', percentage: 5.2, value: 32.28, color: '#f0dcdf' },
          { ticker: 'CSCO', percentage: 4.1, value: 25.45, color: '#d8e9d9' },
          { ticker: 'IBM', percentage: 3.9, value: 24.21, color: '#f0dde0' },
          { ticker: 'PLTR', percentage: 3.5, value: 21.72, color: '#dae9da' },
          { ticker: 'INTC', percentage: 2.8, value: 17.38, color: '#f0dde1' },
          { ticker: 'Others', percentage: 19.5, value: 121.04, color: '#e5e7eb' }
        ]
      }
    ],

    performanceData: {
      '1D': Array.from({ length: 24 }, (_, i) => ({
        date: `${i}:00`,
        value: 620 + Math.random() * 10 - 5
      })),
      'M': Array.from({ length: 30 }, (_, i) => ({
        date: `Day ${i + 1}`,
        value: 600 + Math.random() * 30 - 10
      })),
      '3M': Array.from({ length: 90 }, (_, i) => ({
        date: `Day ${i + 1}`,
        value: 550 + Math.random() * 80 - 20
      })),
      'YTD': Array.from({ length: 120 }, (_, i) => ({
        date: `Day ${i + 1}`,
        value: 500 + Math.random() * 150 - 30
      })),
      'Y': Array.from({ length: 365 }, (_, i) => ({
        date: `Day ${i + 1}`,
        value: 450 + Math.random() * 200 - 40
      })),
      'MAX': Array.from({ length: 500 }, (_, i) => ({
        date: `Day ${i + 1}`,
        value: 400 + Math.random() * 250 - 50
      }))
    }
  };
};

export const StocksISAScreen: React.FC = () => {
  const [data, setData] = useState(generateMockData());
  const [isLoading, setIsLoading] = useState(false);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => ({
        ...prevData,
        accountValue: prevData.accountValue + (Math.random() - 0.5) * 0.1,
        last24hChange: prevData.last24hChange + (Math.random() - 0.5) * 0.01
      }));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setData(generateMockData());
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#2a2a2a] p-8">
      {/* Header */}
      <header className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <h1 className="text-[61px] font-normal text-white">STOCKS ISA</h1>
        </div>

        <button
          onClick={refreshData}
          disabled={isLoading}
          className="px-6 py-3 bg-[#4aa5da] text-white rounded-lg hover:bg-[#3a8fc0] transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Refreshing...' : 'Refresh Data'}
        </button>
      </header>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Account Overview */}
        <section>
          <AccountOverviewCard
            accountValue={data.accountValue}
            last24hChange={data.last24hChange}
            last24hPercentage={data.last24hPercentage}
            rateOfReturn={data.rateOfReturn}
          />
        </section>

        {/* Performance Chart */}
        <section>
          <PerformanceChart
            data={data.performanceData}
            currentValue={data.accountValue}
          />
        </section>

        {/* AI Analysis Banner */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-[35px] text-[#5d5e62] mb-4">AI ANALYSIS</p>
          <p className="text-[44px] text-[#000005] leading-tight">
            The growth-oriented portfolio has declined 14%, heavily weighted in volatile Technology
            and Communications sectors with high beta stocks like Nvidia and Palantir, facing
            significant losses and concentration risks.
          </p>
          <button className="mt-6 text-[45px] text-[#08080e] hover:text-[#4aa5da] transition-colors">
            Read full analysis
          </button>
        </section>

        {/* Investments Section */}
        <section>
          <h2 className="text-[35px] text-[#5b5b5d] mb-6">INVESTMENTS</h2>
          <div className="space-y-6">
            {data.pies.map((pie, index) => (
              <InvestmentPieChart
                key={index}
                pieName={pie.pieName}
                totalValue={pie.totalValue}
                holdings={pie.holdings}
                totalChange={pie.totalChange}
                totalChangePercentage={pie.totalChangePercentage}
                numHoldings={pie.numHoldings}
              />
            ))}
          </div>
        </section>

        {/* ISA Allowance */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-[34px] text-[#605f64] mb-6">ISA ALLOWANCE</h2>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-5 h-16 bg-green-500 rounded"></div>
                <span className="text-[46px] text-[#101014]">Cash ISA</span>
              </div>
              <span className="text-[37px] text-[#000004]">0.00</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-5 h-16 bg-blue-500 rounded"></div>
                <span className="text-[44px] text-[#0c0d11]">Stocks ISA</span>
              </div>
              <span className="text-[38px] text-[#000004]">0.00</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-5 h-16 bg-gray-300 rounded"></div>
                <span className="text-[43px] text-[#000004]">Remaining</span>
              </div>
              <span className="text-[39px] text-[#000004]">20,000.00</span>
            </div>
          </div>

          <button className="mt-6 text-[44px] text-[#141419] hover:text-[#4aa5da] transition-colors">
            Learn more
          </button>
        </section>

        {/* Brokerage Transfer Promotion */}
        <section className="bg-gradient-to-br from-[#4aa5da] to-[#3a8fc0] rounded-lg shadow-sm p-12 text-center">
          <h2 className="text-[49px] font-normal text-[#f8fdfe] mb-4">
            Switching brokers?
          </h2>
          <p className="text-[43px] text-[#e2eef6] mb-2">
            Transfer your portfolio free
          </p>
          <p className="text-[46px] text-[#dae6ee]">
            of charge
          </p>
        </section>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex justify-around items-center max-w-screen-xl mx-auto">
          <button className="flex flex-col items-center gap-2 text-gray-600 hover:text-[#4aa5da] transition-colors">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 12L16 4l12 8v16H4z"/>
            </svg>
            <span className="text-sm">Home</span>
          </button>
          <button className="flex flex-col items-center gap-2 text-[#4aa5da]">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="4" y="8" width="24" height="16" rx="2"/>
              <path d="M4 12h24"/>
            </svg>
            <span className="text-sm">Invest</span>
          </button>
          <button className="flex flex-col items-center gap-2 text-gray-600 hover:text-[#4aa5da] transition-colors">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 16h24M16 4v24"/>
            </svg>
            <span className="text-sm">Trade</span>
          </button>
          <button className="flex flex-col items-center gap-2 text-gray-600 hover:text-[#4aa5da] transition-colors">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="16" cy="8" r="4"/>
              <path d="M8 28v-4a6 6 0 0112 0v4"/>
            </svg>
            <span className="text-sm">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
};
