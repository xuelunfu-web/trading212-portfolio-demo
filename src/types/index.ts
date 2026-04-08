export type TimePeriod = '1D' | 'M' | '3M' | 'YTD' | 'Y' | 'MAX';

export interface DataPoint {
  date: string;
  value: number;
}

export interface Holding {
  ticker: string;
  percentage: number;
  value: number;
  color: string;
}

export interface InvestmentPie {
  pieName: string;
  totalValue: number;
  totalChange: number;
  totalChangePercentage: number;
  numHoldings: number;
  holdings: Holding[];
}

export interface AccountData {
  accountValue: number;
  last24hChange: number;
  last24hPercentage: number;
  rateOfReturn: number;
}

export interface PerformanceData {
  '1D': DataPoint[];
  'M': DataPoint[];
  '3M': DataPoint[];
  'YTD': DataPoint[];
  'Y': DataPoint[];
  'MAX': DataPoint[];
}
