import { Badge } from '../../../components/ui/Badge/badge';
import { Container } from '../../../components/ui/Container';
import { getTickers } from '../../supabase-server';
import Loading from '@/app/loading';
import { Suspense } from 'react';

export default async function PricingPage({
  params
}: {
  params: { selectedTicker: string };
}) {
  const selectedTicker = params.selectedTicker;

  const [tickers] = await Promise.all([getTickers()]);

  const tickerFromDb = tickers?.find((value) => value.ticker == selectedTicker);

  async function getStockInfo() {
    const res = await fetch(
      `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${selectedTicker}&apikey=${process.env.VANTAGE_API_KEY}`
    );
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
    }

    return res.json() || 'No Data Found';
  }
  const data = await getStockInfo();

  console.log(data);
  return (
    <Suspense fallback={<Loading />}>
      <Container>
        <div className="flex gap-2">
          <h2>
            {tickerFromDb?.ticker}: ${tickerFromDb?.price.toFixed(2)}
          </h2>
          <h3>
            <Badge variant={tickerFromDb?.signal as 'BUY' | 'HOLD' | 'SELL'}>
              {tickerFromDb?.signal}
            </Badge>
          </h3>
        </div>
      </Container>
    </Suspense>
  );
}
