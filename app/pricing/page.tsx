import {
  getSession,
  getSubscription,
  getActiveProductsWithPrices
} from '@/app/supabase-server';
import Pricing from '@/components/ui/Pricing/Pricing';
import { useUserStore } from '@/store/useUserStore';

export default async function PricingPage() {
  const [session, products, subscription] = await Promise.all([
    getSession(),
    getActiveProductsWithPrices(),
    getSubscription()
  ]);
  // Todo:
  //   useUserStore.setState({
  //     session,
  //     products,
  //     user: session?.user,
  //     subscription
  //   });

  return (
    <Pricing
      session={session}
      user={session?.user}
      products={products}
      subscription={subscription}
    />
  );
}
