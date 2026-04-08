import React, { useState, useMemo } from 'react';

type TimePeriod = '1D' | 'M' | '3M' | 'YTD' | 'Y' | 'MAX';

interface DataPoint {
  date: string;
  value: number;
}

interface PerformanceChartProps {
  data: Record<TimePeriod, DataPoint[]>;
  currentValue: number;
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({
  data,
  currentValue
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('1D');
  const [hoveredPoint, setHoveredPoint] = useState<DataPoint | null>(null);

  const periods: TimePeriod[] = ['1D', 'M', '3M', 'YTD', 'Y', 'MAX'];

  const chartData = data[selectedPeriod] || [];

  // Calculate chart dimensions
  const width = 1100;
  const height = 400;
  const padding = { top: 20, right: 20, bottom: 40, left: 60 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Calculate min and max values for scaling
  const { minValue, maxValue, pathData, points } = useMemo(() => {
    if (chartData.length === 0) {
      return { minValue: 0, maxValue: 100, pathData: '', points: [] };
    }

    const values = chartData.map(d => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;

    // Create path data
    const calculatedPoints = chartData.map((point, index) => {
      const x = padding.left + (index / (chartData.length - 1)) * chartWidth;
      const y = padding.top + chartHeight - ((point.value - min) / range) * chartHeight;
      return { x, y, data: point };
    });

    const path = calculatedPoints
      .map((point, index) => {
        const command = index === 0 ? 'M' : 'L';
        return `${command} ${point.x} ${point.y}`;
      })
      .join(' ');

    return {
      minValue: min,
      maxValue: max,
      pathData: path,
      points: calculatedPoints
    };
  }, [chartData, chartWidth, chartHeight]);

  // Determine if chart is positive or negative
  const isPositive = chartData.length > 0 &&
    chartData[chartData.length - 1].value >= chartData[0].value;

  // Create grid lines
  const gridLines = Array.from({ length: 5 }, (_, i) => {
    const y = padding.top + (chartHeight / 4) * i;
    const value = maxValue - ((maxValue - minValue) / 4) * i;
    return { y, value };
  });

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 w-full max-w-[1156px]">
      {/* Chart Area */}
      <div className="relative mb-6">
        <svg
          width={width}
          height={height}
          className="w-full h-auto"
          onMouseLeave={() => setHoveredPoint(null)}
        >
          {/* Grid lines */}
          {gridLines.map((line, index) => (
            <g key={index}>
              <line
                x1={padding.left}
                y1={line.y}
                x2={width - padding.right}
                y2={line.y}
                stroke="#e5e7eb"
                strokeWidth="1"
              />
              <text
                x={padding.left - 10}
                y={line.y + 4}
                textAnchor="end"
                fontSize="12"
                fill="#6b7280"
              >
                {line.value.toFixed(0)}
              </text>
            </g>
          ))}

          {/* Area under the line */}
          {pathData && (
            <path
              d={`${pathData} L ${width - padding.right} ${height - padding.bottom} L ${padding.left} ${height - padding.bottom} Z`}
              fill={isPositive ? 'rgba(74, 165, 218, 0.1)' : 'rgba(217, 88, 83, 0.1)'}
            />
          )}

          {/* Line */}
          {pathData && (
            <path
              d={pathData}
              fill="none"
              stroke={isPositive ? '#4aa5da' : '#d95853'}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Interactive points */}
          {points.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r={hoveredPoint === point.data ? 6 : 0}
              fill={isPositive ? '#4aa5da' : '#d95853'}
              className="cursor-pointer transition-all"
              onMouseEnter={() => setHoveredPoint(point.data)}
            />
          ))}

          {/* Hover areas for better interaction */}
          {points.map((point, index) => (
            <rect
              key={`area-${index}`}
              x={point.x - 10}
              y={padding.top}
              width={20}
              height={chartHeight}
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => setHoveredPoint(point.data)}
            />
          ))}
        </svg>

        {/* Tooltip */}
        {hoveredPoint && (
          <div className="absolute bg-black text-white px-3 py-2 rounded text-sm pointer-events-none"
            style={{
              top: '10px',
              right: '10px'
            }}
          >
            <div>{hoveredPoint.date}</div>
            <div className="font-bold">{hoveredPoint.value.toFixed(2)}</div>
          </div>
        )}
      </div>

      {/* Time Period Selector */}
      <div className="flex items-center justify-center gap-4">
        {periods.map((period) => (
          <button
            key={period}
            onClick={() => setSelectedPeriod(period)}
            className={`
              px-4 py-2 rounded-lg text-[33px] font-normal transition-all
              ${selectedPeriod === period
                ? 'bg-black text-white'
                : 'bg-white text-[#656565] border border-[#656565] hover:bg-gray-50'
              }
            `}
          >
            {period}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="flex justify-end mt-4">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-600">Current Value:</span>
          <span className={`font-bold ${isPositive ? 'text-[#4aa5da]' : 'text-[#d95853]'}`}>
            {currentValue.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};
