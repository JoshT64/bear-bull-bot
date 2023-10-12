import { DataDisplay } from '.';
import { PricingProps } from '../Pricing/types';

export const Homepage = ({
  products,
  session,
  subscription,
  user
}: PricingProps) => {
  return (
    <section className="bg-black animate-in">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center">
          {!user && (
            <p className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
              You must be logged in to see Dashboard and Stock statistics.
            </p>
          )}
          {user && (
            <>
              <h1 className="pb-2">Dashboard</h1>
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
