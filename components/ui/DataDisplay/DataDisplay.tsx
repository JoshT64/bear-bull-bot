'use client';

import { Container } from '../Container';
import { PricingProps } from '../Pricing/types';
import { LineChart } from './components';

export const DataDisplay = ({
  session,
  products,
  user,
  subscription
}: PricingProps) => {
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

  return (
    <Container direction="row" className="text-white sm:text-center ">
      <LineChart />
      <LineChart />
    </Container>
  );
};
