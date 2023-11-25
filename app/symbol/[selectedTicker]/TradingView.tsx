'use client';

import Loading from '../../loading';
import React, { useEffect, useRef, useState } from 'react';

let tvScriptLoadingPromise: Promise<void> | null = null;
type tradingViewWidgetProps = {
  selectedTicker: string;
};

export default function TradingViewWidget({
  selectedTicker
}: tradingViewWidgetProps) {
  const onLoadScriptRef = useRef<(() => void) | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise<void>((resolve) => {
        const script = document.createElement('script');
        script.id = 'tradingview-widget-loading-script';
        script.src = 'https://s3.tradingview.com/tv.js';
        script.type = 'text/javascript';
        script.onload = () => resolve();
        setIsLoading(true);

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(
      () => onLoadScriptRef.current && onLoadScriptRef.current()
    );

    return () => {
      onLoadScriptRef.current = null;
    };

    function createWidget() {
      console.log(selectedTicker);
      if (
        document.getElementById('tradingview_26989') &&
        !isLoading &&
        'TradingView' in window
      ) {
        new (window as any).TradingView.widget({
          autosize: true,
          // symbol: 'SPY',
          symbol: `${selectedTicker && selectedTicker}`,

          interval: 'D',
          timezone: 'Etc/UTC',
          theme: 'dark',
          style: '1',
          locale: 'en',
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: 'tradingview_26989'
        });
      }
    }
  }, []);

  return (
    <div
      className="tradingview-widget-container"
      style={{ height: '650px', width: '650px' }}
    >
      {!isLoading ? (
        <Loading />
      ) : (
        <div
          className="tradingview-widget-container"
          style={{ height: '500px', width: '650px' }}
        >
          <div
            id="tradingview_26989"
            style={{ height: 'calc(100% - 32px)', width: '100%' }}
          />
          <div className="tradingview-widget-copyright"></div>
        </div>
      )}
    </div>
  );
}
