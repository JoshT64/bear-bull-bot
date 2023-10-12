import Loading from '@/app/loading';
import {
  getSession,
  getSubscription,
  getActiveProductsWithPrices
} from '@/app/supabase-server';
import { Pricing } from '@/components/ui/Pricing/Pricing';
import { Suspense } from 'react';

export default async function PricingPage() {
  const [session, products, subscription] = await Promise.all([
    getSession(),
    getActiveProductsWithPrices(),
    getSubscription()
  ]);

  return (
    <Suspense fallback={<Loading />}>
      <Pricing
        session={session}
        user={session?.user}
        products={products}
        subscription={subscription}
      />
    </Suspense>
  );
}
