def find(price, rsi):
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