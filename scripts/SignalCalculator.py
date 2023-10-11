import yfinance as yf
import numpy as np
import pandas as pd
import RsiComputer
import DivergenceFinder

#TODO Remove portfolio variables & functionality (shares, balance, etc)
def calculateSignal(TickerIn):
    #TODO add functionality to change start date
    start="2022-10-15"
    ticker = TickerIn
    df = yf.download(ticker, start , end=(pd.to_datetime('today') + pd.DateOffset(days=1)).date().strftime('%Y-%m-%d'), interval="1d")
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
    signal="HOLD"
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
            shares = 0  # Reset shares
            sell_dates.append(i)
            sell_prices.append(current_price)
            signal="SELL"

        # Conditions for buying
        elif (current_index in bearish_divs or current_index in bearish_hidden_divs) and shares == 0 and balance > 0:
            shares_bought = balance // current_price
            last_trade_price = current_price
            balance -= shares_bought * current_price
            shares += shares_bought
            buy_dates.append(i)
            buy_prices.append(current_price)
            signal = "BUY"
        portfolio_value = balance + (shares * current_price)
        portfolio.append(portfolio_value)

    date_str_final = df.index[-1].strftime('%Y-%m-%d')
    time_str_final = df.index[-1].strftime('%I:%M%p').lstrip('0')
    if shares > 0:
        trade_value = shares * current_price
        gain_loss = trade_value - (shares * last_trade_price)
    return signal