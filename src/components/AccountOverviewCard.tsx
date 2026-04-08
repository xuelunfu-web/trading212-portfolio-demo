import React from 'react';

interface AccountOverviewCardProps {
  accountValue: number;
  last24hChange: number;
  last24hPercentage: number;
  rateOfReturn: number;
  currency?: string;
}

export const AccountOverviewCard: React.FC<AccountOverviewCardProps> = ({
  accountValue,
  last24hChange,
  last24hPercentage,
  rateOfReturn,
  currency = '£'
}) => {
  const isPositive24h = last24hChange >= 0;
  const isPositiveReturn = rateOfReturn >= 0;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 w-full max-w-[540px]">
      {/* Account Value Section */}
      <div className="mb-8">
        <p className="text-[#5c5c5c] text-sm font-normal mb-2">
          ACCOUNT VALUE
        </p>
        <div className="flex items-center gap-2">
          <svg
            width="51"
            height="60"
            viewBox="0 0 51 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-40"
          >
            <path d="M25.5 0L51 60H0L25.5 0Z" fill={isPositive24h ? '#4aa5da' : '#d95853'} />
          </svg>
          <p className="text-[120px] font-normal text-black leading-none">
            {accountValue.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Bottom Section: Last 24H and Rate of Return */}
      <div className="flex justify-between items-end">
        {/* Last 24H */}
        <div>
          <p className="text-[#6c6c6c] text-sm mb-2">LAST 24H</p>
          <div className="flex items-center gap-2">
            {/* Arrow Icon */}
            <div className="w-11 h-9">
              <svg
                width="45"
                height="35"
                viewBox="0 0 45 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isPositive24h ? (
                  <path d="M22.5 0L45 35H0L22.5 0Z" fill="#4aa5da" />
                ) : (
                  <path d="M22.5 35L45 0H0L22.5 35Z" fill="#d95853" />
                )}
              </svg>
            </div>
            <p className={`text-[43px] font-normal leading-none ${
              isPositive24h ? 'text-[#4aa5da]' : 'text-[#b14344]'
            }`}>
              {Math.abs(last24hChange).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Rate of Return */}
        <div>
          <p className="text-[#666] text-sm mb-2">RATE OF RETURN</p>
          <div className="flex items-center gap-2">
            {/* Arrow Icon */}
            <div className="w-9 h-9">
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isPositiveReturn ? (
                  <path d="M18 0L36 36H0L18 0Z" fill="#4aa5da" />
                ) : (
                  <path d="M18 36L36 0H0L18 36Z" fill="#d95853" />
                )}
              </svg>
            </div>
            <p className={`text-[43px] font-normal leading-none ${
              isPositiveReturn ? 'text-[#4aa5da]' : 'text-[#d95853]'
            }`}>
              {Math.abs(rateOfReturn).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
