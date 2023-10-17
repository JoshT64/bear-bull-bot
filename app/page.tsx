import Loading from '@/app/loading';
import {
  getSession,
  getSubscription,
  getActiveProductsWithPrices,
  getTickers
} from '@/app/supabase-server';
import { Homepage } from '@/components/ui/Homepage';
import { Suspense } from 'react';

export default async function PricingPage() {
  const [session, products, subscription, tickers] = await Promise.all([
    getSession(),
    getActiveProductsWithPrices(),
    getSubscription(),
    getTickers()
  ]);

  console.log(tickers);

  return (
    <Suspense fallback={<Loading />}>
      <Homepage
        session={session}
        user={session?.user}
        products={products}
        subscription={subscription}
      />
    </Suspense>
  );
}
