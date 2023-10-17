'use client';

import { Combobox } from '@/components/ui/Combobox';
import { useEffect, useState } from 'react';

export type Tickers = (typeof stocks)[number]['tickers'][number];

const stocks = [
  {
    label: 'Stocks',
    tickers: [
      {
        label: 'SPY',
        value: 'SPY'
      }
    ]
  },
  {
    label: 'Cryptocurrency',
    tickers: [
      {
        label: 'Bitcoin-USD',
        value: 'BTC-USD'
      },
      {
        label: 'Ethereum',
        value: 'ETH-USD'
      }
    ]
  }
];

export const StockSearch = () => {
  return <Combobox placeholder="Search stocks..." stocks={stocks}></Combobox>;
};
