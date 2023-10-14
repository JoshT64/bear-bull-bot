'use client';

import { Combobox } from '@/components/ui/Combobox';
import { useEffect, useState } from 'react';

export const StockSearch = () => {
  //   const [suggestions, setSuggestions] = useState([]);

  const suggestions = [
    {
      value: 'next.js',
      label: 'Next.js'
    },
    {
      value: 'sveltekit',
      label: 'SvelteKit'
    },
    {
      value: 'nuxt.js',
      label: 'Nuxt.js'
    },
    {
      value: 'remix',
      label: 'Remix'
    },
    {
      value: 'astro',
      label: 'Astro'
    }
  ];

  useEffect(() => {
    // Fetch stock tickers data from an API and update the suggestions state
    // fetchStockTickers().then((data) => {
    //   setSuggestions(data);
    // });
  }, []);

  return <Combobox></Combobox>;
};

// Assume fetchStockTickers and fetchSuggestions are functions that fetch data from an API.
