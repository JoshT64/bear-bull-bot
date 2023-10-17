'use client';

import { Container } from '../Container';
import { LineChart } from './components';
import { HomepageProps } from './types';

export const DataDisplay = ({ tickers }: HomepageProps) => {
  // Setup user store .. this is being done redundantly
  // on this page & on pricing page --
  // should look into fetching only once but for now this works

  // Makes app slower >> Disabling for now until long term solution

  // useEffect(() => {
  //   useUserStore.setState({
  //     session,
  //     products,
  //     user: session?.user,
  //     subscription
  //   });
  // }, []);
  console.log('tickers', tickers);
  return (
    <Container direction="row" className="text-white sm:text-center ">
      <LineChart />
      <LineChart />
    </Container>
  );
};
