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
  //   const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    // Fetch stock tickers data from an API and update the suggestions state
    // fetchStockTickers().then((data) => {
    //   setSuggestions(data);
    // });
  }, []);

  return <Combobox placeholder="Search stocks..." stocks={stocks}></Combobox>;
};

// Assume fetchStockTickers and fetchSuggestions are functions that fetch data from an API.
