import {
  getSession,
  getSubscription,
  getActiveProductsWithPrices
} from '@/app/supabase-server';
import { Homepage } from '@/components/ui/DataDisplay';

export default async function PricingPage() {
  const [session, products, subscription] = await Promise.all([
    getSession(),
    getActiveProductsWithPrices(),
    getSubscription()
  ]);

  return (
    <Homepage
      session={session}
      user={session?.user}
      products={products}
      subscription={subscription}
    />
  );
}
