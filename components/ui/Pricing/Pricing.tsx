'use client';

import {
  SingleProductPricing,
  MultiProductPricing,
  NoPricingData
} from './index';
import { PricingProps } from './types';
import { useUserStore } from '@/store/useUserStore';

export default function Pricing({
  products,
  session,
  subscription,
  user
}: PricingProps) {
  // const { products, session, subscription, user } = useUserStore();

  // console.log(products, session, subscription, user);

  if (!products.length) return <NoPricingData />;

  if (products.length === 1) {
    return (
      <SingleProductPricing
        products={products}
        session={session}
        subscription={subscription}
        user={user}
      />
    );
  }

  return (
    <MultiProductPricing
      products={products}
      session={session}
      subscription={subscription}
      user={user}
    />
  );
}
