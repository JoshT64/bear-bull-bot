import TickerIngest
import SignalCalculator
import os

tickers = TickerIngest.ingest(os.path.join(os.path.dirname(os.path.abspath(__file__)),"MasterTickerList.txt"))

for ticker in tickers:
    print(f"Ticker: {ticker.strip()}\nSignal: {SignalCalculator.calculateSignal(ticker)}")

    
    
