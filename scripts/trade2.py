from flask import Flask, jsonify, request
import yfinance as yf
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

app = Flask(__name__)


def compute_rsi(data, window=14):
    delta = data['Close'].diff()
    gain = (delta.where(delta > 0, 0)).fillna(0)
    loss = (-delta.where(delta < 0, 0)).fillna(0)

    avg_gain = gain.rolling(window=window, min_periods=1).mean()
    avg_loss = loss.rolling(window=window, min_periods=1).mean()

    rs = avg_gain / avg_loss
    rsi = 100 - (100 / (1 + rs))
    return rsi

def find_divergences(price, rsi):
    bearish_divs = []
    bullish_divs = []
    bearish_hidden_divs = []
    bullish_hidden_divs = []

    for i in range(2, len(price)):
        if price[i-2] < price[i-1] and price[i-1] > price[i] and rsi[i-2] > rsi[i-1] and rsi[i-1] < rsi[i]:  # bearish regular
            bearish_divs.append(i-1)
        elif price[i-2] > price[i-1] and price[i-1] < price[i] and rsi[i-2] < rsi[i-1] and rsi[i-1] > rsi[i]:  # bullish regular
            bullish_divs.append(i-1)
        elif price[i-2] > price[i-1] and price[i-1] < price[i] and rsi[i-2] > rsi[i-1] and rsi[i-1] < rsi[i]:  # bearish hidden
            bearish_hidden_divs.append(i-1)
        elif price[i-2] < price[i-1] and price[i-1] > price[i] and rsi[i-2] < rsi[i-1] and rsi[i-1] > rsi[i]:  # bullish hidden
            bullish_hidden_divs.append(i-1)

    return bearish_divs, bullish_divs, bearish_hidden_divs, bullish_hidden_divs

def stock_analysis(ticker, last_processed_date=None):
    df = yf.download(ticker.strip(), start="2023-10-03", end=pd.to_datetime('today').date().strftime('%Y-%m-%d'), interval='15m', progress=False)
  
    last_date_processed = df.index[0].date()

    if last_processed_date:
        df = df[df.index > last_processed_date]
    if df.empty:
        return last_processed_date, []

    df['RSI'] = compute_rsi(df)
    bearish_divs, bullish_divs, bearish_hidden_divs, bullish_hidden_divs = find_divergences(df['Close'].values, df['RSI'].values)

    initial_balance = 10000
    shares = 0
    balance = initial_balance
    portfolio = []
    buy_dates = []
    buy_prices = []
    sell_dates = []
    sell_prices = []
    last_trade_price = 0
    trade_records = []

    messages = []

    last_action = "none"

    for i, row in df.iterrows():
        current_date = i.date()
        current_price = row['Close']
        current_index = df.index.get_loc(i)

        if last_date_processed != current_date:
            action_performed_today = False
            last_date_processed = current_date
        
        if (current_index in bullish_divs or current_index in bullish_hidden_divs) and shares > 0 and not action_performed_today and last_action != "sell":
            trade_value = shares * current_price
            gain_loss = trade_value - (shares * last_trade_price)
            percentage_gain_loss = (gain_loss / (shares * last_trade_price)) * 100
            balance += trade_value

            trade_identifier = (ticker, 'sell', i.date())
            if trade_identifier not in trade_records:
                trade_records.append(trade_identifier)

            shares = 0
            sell_dates.append(i)
            sell_prices.append(current_price)
            action_performed_today = True
            last_action = "sell"
        elif (current_index in bearish_divs or current_index in bearish_hidden_divs) and shares == 0 and balance > 0:
            shares_bought = balance // current_price
            last_trade_price = current_price
            balance -= shares_bought * current_price
            shares += shares_bought
            buy_dates.append(i)
            buy_prices.append(current_price)
            trade_identifier = (ticker, 'buy', i.date())
            if trade_identifier not in trade_records:
                trade_records.append(trade_identifier)

            action_performed_today = True
            last_action = "buy"
        
        portfolio_value = balance + (shares * current_price)
        portfolio.append(portfolio_value)

    if shares > 0:
        trade_value = shares * current_price
        gain_loss = trade_value - (shares * last_trade_price)
        messages.append(f"Final holding on {df.index[-1].date()}. {ticker} Shares: {shares:.0f} @ ${current_price:.2f}. Gain/Loss on Holding: ${gain_loss:.2f}. Portfolio Value: ${(balance + shares * current_price):.2f}.")

    messages.append(f"Initial Balance for {ticker}: ${initial_balance}")
    messages.append(f"Final Balance for {ticker}: ${portfolio[-1]}")
    messages.append(f"Return for {ticker}: {(portfolio[-1] - initial_balance) / initial_balance * 100:.2f}%")

    return df.index[-1], messages, ticker

@app.route('/analyze/<ticker>', methods=['GET'])
def analyze_stock(ticker):
    last_processed_date = request.args.get('last_processed_date', None)
    
    if last_processed_date:
        last_processed_date = pd.to_datetime(last_processed_date)
    
    last_processed_date, messages, ticker = stock_analysis(ticker, last_processed_date)
    response = {
        "last_processed_date": last_processed_date.strftime('%Y-%m-%d'),
        "messages": messages,
        "ticker": ticker
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)

# Fetch data and compute RSI
ticker = "SPY"
df = yf.download(ticker.strip(), start="2022-01-01", end=pd.to_datetime('today').date().strftime('%Y-%m-%d'))
df['RSI'] = compute_rsi(df)
bearish_divs, bullish_divs, bearish_hidden_divs, bullish_hidden_divs = find_divergences(df['Close'].values, df['RSI'].values)

# Mock portfolio logic
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
    current_price = row['Close']
    current_index = df.index.get_loc(i)
    
    # Conditions for selling
    if (current_index in bullish_divs or current_index in bullish_hidden_divs) and shares > 0:
        trade_value = shares * current_price
        gain_loss = trade_value - (shares * last_trade_price)
        balance += trade_value
        print(f"Selling on {i.date()}. {ticker} Shares: {shares:.0f} @ ${current_price:.2f}. Gain/Loss on Trade: ${gain_loss:.2f}. Portfolio Value: ${balance:.2f}.")
        shares = 0  # Reset shares
        sell_dates.append(i)
        sell_prices.append(current_price)

    # Conditions for buying
    elif (current_index in bearish_divs or current_index in bearish_hidden_divs) and shares == 0 and balance > 0:
        shares_bought = balance // current_price
        last_trade_price = current_price
        balance -= shares_bought * current_price
        shares += shares_bought
        print(f"Buying on {i.date()}. {ticker} Shares: {shares:.0f} @ ${current_price:.2f}. Portfolio Value: ${(balance + shares * current_price):.2f}.")
        buy_dates.append(i)
        buy_prices.append(current_price)
    portfolio_value = balance + (shares * current_price)
    portfolio.append(portfolio_value)

if shares > 0:
    trade_value = shares * current_price
    gain_loss = trade_value - (shares * last_trade_price)
    print(f"Final holding on {df.index[-1].date()}. {ticker} Shares: {shares:.0f} @ ${current_price:.2f}. Gain/Loss on Holding: ${gain_loss:.2f}. Portfolio Value: ${(balance + shares * current_price):.2f}.")

print(f"Initial Balance: ${initial_balance}")
print(f"Final Balance: ${portfolio[-1]}")
print(f"Return: {(portfolio[-1] - initial_balance) / initial_balance * 100:.2f}%")