import { postData } from '../../../../utils/helpers';
import { getStripe } from '../../../../utils/stripe-client';
import { BillingInterval, Price, PricingProps } from '../types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const usePricing = ({
  products,
  user,
  session,
  subscription
}: PricingProps) => {
  const intervals = Array.from(
    new Set(
      products.flatMap((product) =>
        product?.prices?.map((price) => price?.interval)
      )
    )
  );
  const router = useRouter();
  const [billingInterval, setBillingInterval] =
    useState<BillingInterval>('month');
  const [priceIdLoading, setPriceIdLoading] = useState<string>();

  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);
    if (!user) {
      return router.push('/signin');
    }
    if (subscription) {
      return router.push('/account');
    }
    try {
      const { sessionId } = await postData({
        url: '/api/create-checkout-session',
        data: { price }
      });

      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      return alert((error as Error)?.message);
    } finally {
      setPriceIdLoading(undefined);
    }
  };

  return {
    handleCheckout,
    intervals,
    priceIdLoading,
    billingInterval,
    setBillingInterval
  };
};
