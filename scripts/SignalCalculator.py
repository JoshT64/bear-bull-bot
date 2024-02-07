import yfinance as yf
import numpy as np
import pandas as pd
import RsiComputer
import DivergenceFinder

def calculateSignal(TickerIn):
    #TODO add functionality to change start date

    start = "2022-10-15"
    ticker = TickerIn
    df = yf.download(ticker, start, end=(pd.to_datetime('today') + pd.DateOffset(days=1)).date().strftime('%Y-%m-%d'), interval="1d")
    df['RSI'] = RsiComputer.compute(df)
    bearish_divs, bullish_divs, bearish_hidden_divs, bullish_hidden_divs = DivergenceFinder.find(df['Open'].values, df['RSI'].values)

    # Reset portfolio for each ticker
    initial_balance = 1000
    shares = 0
    balance = initial_balance
    portfolio = []
    last_trade_price = 0
    signal = "HOLD"

    for i, row in df.iterrows():
        current_price = row['Open']
        current_index = df.index.get_loc(i)
        
        date_str = i.strftime('%Y-%m-%d')
        time_str = "9:30AM"  # Change to
        current_rsi = df.loc[i, 'RSI']

        # Conditions for selling
        if (current_index in bullish_divs or current_index in bullish_hidden_divs) and shares > 0:
            if current_rsi > 70:
                signal = "STRONG SELL"
            else:
                signal = "SELL"
            shares = 0  # Reset shares

        # Conditions for buying
        elif (current_index in bearish_divs or current_index in bearish_hidden_divs) and shares == 0 and balance > 0:
            if current_rsi < 30:
                signal = "STRONG BUY"
            else:
                signal = "BUY"
            shares = (balance // current_price)  # Added to make sure the number of shares is updated correctly
            balance -= shares * current_price

    return signal

# Example of usage:
print(calculateSignal('AAPL'))