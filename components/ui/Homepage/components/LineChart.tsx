'use client';

import { Charts } from '../Charts';
import { SelectTicker } from '../SelectTicker';

export const LineChart = () => {
  return (
    <div className="w-2/4 rounded-xl border bg-card text-card-foreground shadow mt-12 ">
      <div className="flex flex-row space-y-1.5 p-6">
        <h3 className="flex items-center font-semibold leading-none tracking-tight">
          <SelectTicker /> vs Bull Bear Bot
        </h3>
      </div>
      <div className="p-6 pt-0">
        <Charts />
      </div>
    </div>
  );
};
