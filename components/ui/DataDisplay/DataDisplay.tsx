'use client';

import { Container } from '../Container';
import { PricingProps } from '../Pricing/types';
import { Charts } from './Charts';
import { SelectTicker } from './SelectTicker';
import { useUserStore } from '@/store/useUserStore';
import { useEffect } from 'react';

export const DataDisplay = ({
  session,
  products,
  user,
  subscription
}: PricingProps) => {
  // Setup user store .. this is being done redundantly
  // on this page & on pricing page --
  // should look into fetching only once but for now this works
  useEffect(() => {
    useUserStore.setState({
      session,
      products,
      user: session?.user,
      subscription
    });
  }, []);

  return (
    <Container direction="row" className="text-white sm:text-center ">
      <div className="w-2/4 rounded-xl border bg-card text-card-foreground shadow ">
        <div className="flex flex-row space-y-1.5 p-6">
          <h3 className="flex items-center font-semibold leading-none tracking-tight">
            <SelectTicker /> vs Bull Bear Bot
          </h3>
        </div>
        <div className="p-6 pt-0">
          <Charts />
        </div>
      </div>
      <div className="w-2/4 rounded-xl border bg-card text-card-foreground shadow ">
        <div className="flex flex-row space-y-1.5 p-6">
          <h3 className="flex items-center font-semibold leading-none tracking-tight">
            <SelectTicker /> vs Bull Bear Bot
          </h3>
        </div>
        <div className="p-6 pt-0">
          <Charts />
        </div>
      </div>
    </Container>
  );
};
