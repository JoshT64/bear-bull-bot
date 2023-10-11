'use client';

import {
  SingleProductPricing,
  MultiProductPricing,
  NoPricingData
} from './index';
import { PricingProps } from './types';
import { useUserStore } from '@/store/useUserStore';
import { useEffect } from 'react';

export function Pricing({ products, session, subscription }: PricingProps) {
  // Setup user store
  useEffect(() => {
    useUserStore.setState({
      session,
      products,
      user: session?.user,
      subscription
    });
  }, []);

  if (!products.length) return <NoPricingData />;

  if (products.length === 1) {
    return <SingleProductPricing />;
  }

  return <MultiProductPricing />;
}
