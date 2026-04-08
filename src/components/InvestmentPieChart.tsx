import React, { useState } from 'react';

interface Holding {
  ticker: string;
  percentage: number;
  value: number;
  color: string;
}

interface InvestmentPieChartProps {
  pieName: string;
  totalValue: number;
  holdings: Holding[];
  totalChange: number;
  totalChangePercentage: number;
  numHoldings: number;
}

export const InvestmentPieChart: React.FC<InvestmentPieChartProps> = ({
  pieName,
  totalValue,
  holdings,
  totalChange,
  totalChangePercentage,
  numHoldings
}) => {
  const [hoveredSlice, setHoveredSlice] = useState<number | null>(null);

  const isPositive = totalChange >= 0;

  // Calculate pie chart paths
  const createPieSlices = () => {
    const center = 100;
    const radius = 80;
    let currentAngle = -90; // Start from top

    return holdings.map((holding, index) => {
      const sliceAngle = (holding.percentage / 100) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + sliceAngle;

      // Convert to radians
      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;

      // Calculate path coordinates
      const x1 = center + radius * Math.cos(startRad);
      const y1 = center + radius * Math.sin(startRad);
      const x2 = center + radius * Math.cos(endRad);
      const y2 = center + radius * Math.sin(endRad);

      const largeArcFlag = sliceAngle > 180 ? 1 : 0;

      const path = [
        `M ${center} ${center}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        'Z'
      ].join(' ');

      currentAngle = endAngle;

      return {
        path,
        color: holding.color,
        holding
      };
    });
  };

  const slices = createPieSlices();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 w-full max-w-[1040px]">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-[44px] font-normal text-black leading-tight">
          {totalValue.toFixed(2)}
        </h3>
        <button className="p-2">
          <svg width="44" height="28" viewBox="0 0 44 28" fill="none">
            <circle cx="22" cy="14" r="3" fill="#000" />
            <circle cx="35" cy="14" r="3" fill="#000" />
            <circle cx="9" cy="14" r="3" fill="#000" />
          </svg>
        </button>
      </div>

      {/* Pie Name */}
      <p className="text-[43px] font-normal text-[#07080a] mb-2 leading-tight">
        {pieName}
      </p>

      <div className="flex items-center justify-between">
        {/* Left Side: Pie Chart */}
        <div className="relative">
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            className="transform rotate-0"
          >
            {slices.map((slice, index) => (
              <path
                key={index}
                d={slice.path}
                fill={slice.color}
                stroke="white"
                strokeWidth="2"
                className="cursor-pointer transition-opacity hover:opacity-80"
                onMouseEnter={() => setHoveredSlice(index)}
                onMouseLeave={() => setHoveredSlice(null)}
              />
            ))}
          </svg>

          {/* Tooltip on hover */}
          {hoveredSlice !== null && (
            <div className="absolute top-0 left-full ml-4 bg-black text-white px-3 py-2 rounded text-sm whitespace-nowrap">
              {holdings[hoveredSlice].ticker}: {holdings[hoveredSlice].percentage.toFixed(2)}%
            </div>
          )}
        </div>

        {/* Right Side: Details */}
        <div className="flex-1 ml-8">
          <div className="mb-4">
            <p className="text-[36px] text-[#57585a] mb-1">
              {numHoldings} HOLDINGS
            </p>
            <p className={`text-[33px] ${isPositive ? 'text-[#b44448]' : 'text-[#4aa5da]'}`}>
              {isPositive ? '+' : ''}{totalChange.toFixed(2)} ({totalChangePercentage.toFixed(2)}%)
            </p>
          </div>

          {/* Holdings Legend */}
          <div className="space-y-2">
            {holdings.map((holding, index) => (
              <div
                key={index}
                className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                onMouseEnter={() => setHoveredSlice(index)}
                onMouseLeave={() => setHoveredSlice(null)}
              >
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: holding.color }}
                />
                <span className="text-sm font-medium">{holding.ticker}</span>
                <span className="text-sm text-gray-600 ml-auto">
                  {holding.percentage.toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create Pie CTA */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-[45px] text-[#000105] hover:text-[#4aa5da] transition-colors">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 8V24M8 16H24" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            </svg>
            <span>Create a pie</span>
          </button>
        </div>
        <p className="text-[39px] text-[#616266] mt-2">
          Start fresh or copy a ready-made one
        </p>
      </div>
    </div>
  );
};
