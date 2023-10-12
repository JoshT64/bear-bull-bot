export const NoPricingData = () => {
  return (
    <section className="bg-black animate-in">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center"></div>
        <p className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
          No subscription data found{' '}
          <a
            className="text-pink-500 underline"
            href="https://dashboard.stripe.com/products"
            rel="noopener noreferrer"
            target="_blank"
          >
            Stripe Dashboard
          </a>
          .
        </p>
      </div>
    </section>
  );
};
