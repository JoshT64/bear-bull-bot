import {
  ProductWithPrices,
  SubscriptionWithProduct,
  Tickers
} from '../Pricing/types';
import { Session, User } from '@supabase/supabase-js';

export interface HomepageProps {
  session: Session | null;
  user: User | null | undefined;
  products: ProductWithPrices[];
  subscription: SubscriptionWithProduct | null;
  tickers: Tickers[] | null;
}
