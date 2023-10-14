import Loading from '@/app/loading';
import {
  getSession,
  getSubscription,
  getActiveProductsWithPrices
} from '@/app/supabase-server';
import { Homepage } from '@/components/ui/Homepage';
import { Suspense } from 'react';

export default async function PricingPage() {
  const [session, products, subscription] = await Promise.all([
    getSession(),
    getActiveProductsWithPrices(),
    getSubscription()
  ]);

  return (
    <Suspense fallback={<Loading />}>
      <div></div>
    </Suspense>
  );
}
