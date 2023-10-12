import { Database } from '../../../types_db';
import { Session, User } from '@supabase/supabase-js';

export type Subscription = Database['public']['Tables']['subscriptions']['Row'];
export type Product = Database['public']['Tables']['products']['Row'];
export type Price = Database['public']['Tables']['prices']['Row'];
export interface ProductWithPrices extends Product {
  prices: Price[];
}
export interface PriceWithProduct extends Price {
  products: Product | null;
}
export interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null;
}

export interface PricingProps {
  session: Session | null;
  user: User | null | undefined;
  products: ProductWithPrices[];
  subscription: SubscriptionWithProduct | null;
}

export type BillingInterval = 'lifetime' | 'year' | 'month';
