import { Container } from '@/components/ui/Container';

export default function Loading() {
  return (
    <Container>
      <div className="max-w-6xl px-4 py-8 mx-auto relative top-12 sm:py-24 sm:px-6 lg:px-8">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    </Container>
  );
}
