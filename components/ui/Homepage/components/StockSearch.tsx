'use client';

import { Tickers } from '../../Pricing/types';
import { Combobox } from '@/components/ui/Combobox';
import { useEffect, useState } from 'react';

//  {
//   id: 1,
//   timestamp: '2023-10-11T20:21:04.207135+00:00',
//   ticker: 'SPY',
//   price: 435.640014648438,
//   signal: 'BUY'
// },

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

export const StockSearch = ({ tickers }: Tickers) => {
  return <Combobox placeholder="Search stocks..." tickers={tickers}></Combobox>;
};
