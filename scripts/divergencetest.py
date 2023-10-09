import yfinance as yf
import numpy as np
import pandas as pd
import TickerIngest
import RsiComputer
import DivergenceFinder
import os

verbose = False
# Fetch data and compute RSI
tickers = TickerIngest.ingest(os.path.join(os.path.dirname(os.path.abspath(__file__)),"MasterTickerList.txt"))

for ticker in tickers:
    
    # Fetch data and compute RSI
    df = yf.download(ticker, start="2022-10-15", end=(pd.to_datetime('today') + pd.DateOffset(days=1)).date().strftime('%Y-%m-%d'), interval="1d")
    df['RSI'] = RsiComputer.compute(df)
    bearish_divs, bullish_divs, bearish_hidden_divs, bullish_hidden_divs = DivergenceFinder.find(df['Open'].values, df['RSI'].values)

    # Reset portfolio for each ticker
    initial_balance = 1000
    shares = 0
    balance = initial_balance
    portfolio = []
    buy_dates = []
    buy_prices = []
    sell_dates = []
    sell_prices = []
    last_trade_price = 0

    for i, row in df.iterrows():
        current_price = row['Open']
        current_index = df.index.get_loc(i)
        
        date_str = i.strftime('%Y-%m-%d')
        time_str = "9:30AM"  # Change to
        
        # Conditions for selling
        if (current_index in bullish_divs or current_index in bullish_hidden_divs) and shares > 0:
            trade_value = shares * current_price
            gain_loss = trade_value - (shares * last_trade_price)
            balance += trade_value
            if verbose:
                print(f"Selling on {date_str} {time_str}. {ticker} Shares: {shares:.0f} @ ${current_price:.2f}. Gain/Loss on Trade: ${gain_loss:.2f}. Portfolio Value: ${balance:.2f}.")
            shares = 0  # Reset shares
            sell_dates.append(i)
            sell_prices.append(current_price)

        # Conditions for buying
        elif (current_index in bearish_divs or current_index in bearish_hidden_divs) and shares == 0 and balance > 0:
            shares_bought = balance // current_price
            last_trade_price = current_price
            balance -= shares_bought * current_price
            shares += shares_bought
            if verbose:
                print(f"Buying on {date_str} {time_str}. {ticker} Shares: {shares:.0f} @ ${current_price:.2f}. Portfolio Value: ${(balance + shares * current_price):.2f}.")
            buy_dates.append(i)
            buy_prices.append(current_price)
        portfolio_value = balance + (shares * current_price)
        portfolio.append(portfolio_value)

    date_str_final = df.index[-1].strftime('%Y-%m-%d')
    time_str_final = df.index[-1].strftime('%I:%M%p').lstrip('0')
    if shares > 0:
        trade_value = shares * current_price
        gain_loss = trade_value - (shares * last_trade_price)
        if verbose:
            print(f"{ticker} Shares: {shares:.0f} @ ${current_price:.2f}. Gain/Loss on Holding: ${gain_loss:.2f}. Portfolio Value: ${(balance + shares * current_price):.2f}.")

    print(f"Ticker: ${ticker}")
    print(f"Initial Balance: ${initial_balance}")
    print(f"Final Balance: ${portfolio[-1]}")
    print(f"Return: {(portfolio[-1] - initial_balance) / initial_balance * 100:.2f}% \n")
