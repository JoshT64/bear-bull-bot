import json
from http.server import BaseHTTPRequestHandler
import websocket
import pandas as pd
import alpaca_trade_api as tradeapi

# Define constants
API_KEY = 'PKLM65E4TJQZM3ZLFIPV'
API_SECRET = 'HYwwgUWNfhYqlcczkJ4rBMfmorGFHpsUqwvhW518'
BASE_URL = 'wss://stream.data.alpaca.markets/v2/sip'
SYMBOLS = ['AAPL']  # Add or remove symbols as needed
api = tradeapi.REST(API_KEY, API_SECRET, base_url='https://paper-api.alpaca.markets')  # For paper trading

# Create an empty list to store the bars data
bars_list = []

def on_message(ws, message):
    global bars_list
    data = json.loads(message)
    
    if data[0]['T'] == 'b':
        timestamp = data[0]['t']
        closing_price = data[0]['c']
        
        # Append data to the bars_list
        bars_list.append({
            'timestamp': timestamp,
            'closing_price': closing_price
        })
        
        # Save the data to a CSV file
        df = pd.DataFrame(bars_list)
        df.to_csv('bars_data.csv', index=False)

def on_open(ws):
    auth_data = {
        "action": "auth",
        "key": API_KEY,
        "secret": API_SECRET
    }
    ws.send(json.dumps(auth_data))
    
    # Subscribe to minute bars for SYMBOLS
    listen_message = {
        "action": "subscribe",
        "bars": SYMBOLS
    }
    ws.send(json.dumps(listen_message))

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        websocket.enableTrace(True)
        ws = websocket.WebSocketApp(BASE_URL, on_open=on_open, on_message=on_message)
        ws.run_forever()
        self.wfile.write(json.dumps({'status': 'WebSocket connection established'}).encode())
