import {
  ProductWithPrices,
  SubscriptionWithProduct
} from '../components/ui/Pricing/types';
import { Session, User } from '@supabase/supabase-js';
import { create } from 'zustand';

export interface UserStore {
  user: User | null;
  session: Session | null;
  products: ProductWithPrices[];
  subscription: SubscriptionWithProduct | null;
}

export interface UserFunctions {
  setUser: (user: User) => void;
  setSession: (session: Session) => void;
  setProducts: (products: ProductWithPrices[]) => void;
  setSubscription: (subscription: SubscriptionWithProduct) => void;
}

export const useUserStore = create<UserStore & UserFunctions>((set) => ({
  user: null,
  session: null,
  products: [],
  subscription: null,
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setProducts: (products) => set({ products }),
  setSubscription: (subscription) => set({ subscription })
}));
