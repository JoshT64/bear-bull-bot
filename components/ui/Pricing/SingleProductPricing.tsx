import Button from '../Button';
import { usePricing } from './hooks/usePricing';

export const SingleProductPricing = () => {
  const { priceIdLoading, handleCheckout, products, session, subscription } =
    usePricing();

  return (
    <section className="bg-black animate-in">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            Pricing Plans
          </h1>
          <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">
            Bear Bull Bot
          </p>
          <div className="relative flex self-center mt-12 border rounded-lg bg-zinc-900 border-zinc-800">
            <div className="border border-pink-500 border-opacity-50 divide-y rounded-lg shadow-sm bg-zinc-900 divide-zinc-600">
              <div className="p-6 py-2 m-1 text-2xl font-medium text-white rounded-md shadow-sm border-zinc-800 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8">
                {products[0].name}
              </div>
            </div>
          </div>
          <div className="mt-6 space-y-4 sm:mt-12 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
            {products[0].prices?.map((price) => {
              const priceString =
                price.unit_amount &&
                new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: price.currency!,
                  minimumFractionDigits: 0
                }).format(price.unit_amount / 100);

              return (
                <div
                  key={price.interval}
                  className="divide-y rounded-lg shadow-sm divide-zinc-600 bg-zinc-900"
                >
                  <div className="p-6">
                    <p>
                      <span className="text-5xl font-extrabold white">
                        {priceString}
                      </span>
                      <span className="text-base font-medium text-zinc-100">
                        /{price.interval}
                      </span>
                    </p>
                    <p className="mt-4 text-zinc-300">{price?.description}</p>
                    <Button
                      variant="subscribe"
                      type="button"
                      disabled={!session}
                      loading={priceIdLoading === price.id}
                      onClick={() => handleCheckout(price)}
                      className="block w-full py-2 mt-8 text-sm font-semibold text-center rounded-md bg-gray-100  text-black  hover:bg-zinc-800"
                    >
                      {products[0].name === subscription?.prices?.products?.name
                        ? 'Manage'
                        : 'Subscribe'}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
