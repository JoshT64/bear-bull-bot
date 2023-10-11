'use client';

import { PricingProps } from '../Pricing/types';
import { useUserStore } from '@/store/useUserStore';
import { useEffect } from 'react';

export const DataDisplay = ({
  products,
  session,
  subscription
}: PricingProps) => {
  // Setup user store .. this is being done redundantly
  //  on this page & on pricing page --
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
    <section className="bg-black animate-in">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-row sm:align-center"></div>
        <p className="text-center">
          Data from Python script should be display here
        </p>
      </div>
    </section>
  );
};
