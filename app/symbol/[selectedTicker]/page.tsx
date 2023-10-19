import { Container } from '../../../components/ui/Container';
import Loading from '@/app/loading';
// import { useParams } from 'next/navigation';
import { Suspense } from 'react';

export default async function PricingPage({
  searchParams,
  params
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  params: { selectedTicker: string };
}) {
  const selectedTicker = params.selectedTicker;
  return (
    <Suspense fallback={<Loading />}>
      <Container>
        {/* Todo: implement specific ticker display */}
        <div>{selectedTicker}</div>
      </Container>
    </Suspense>
  );
}
