import { PricingProps } from '../Pricing/types';
import { DataDisplay } from './DataDisplay';
import { HomepageProps } from './types';
import { Hero } from '@/components/ui/Hero';
import Link from 'next/link';

export const Homepage = ({
  products,
  session,
  subscription,
  user
}: HomepageProps) => {
  return (
    <section className="bg-black animate-in">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center">
          {!user && (
            <div className="text-4xl pt-12 font-extrabold text-white sm:text-center sm:text-6xl">
              <p className="mb-12">
                You must be logged in to see Dashboard and Stock statistics.
              </p>
              <Link
                href="/signin"
                className="text-pink-600 border-b-4 border-b-pink-600 hover:text-pink-500 hover:border-b-pink-500 transition-colors ease-out"
              >
                Sign in
              </Link>
            </div>
          )}

          {user && (
            <>
              <Hero />
              <DataDisplay
                products={products}
                session={session}
                user={user}
                subscription={subscription}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
};
