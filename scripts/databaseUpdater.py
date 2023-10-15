import datetime
import os
import SignalCalculator
from supabase import create_client, Client
def update(tickerIn):
    env_file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)),".env")
    if os.path.exists(env_file_path):
        with open(env_file_path) as f:
            for line in f:
                key, value = line.strip().split('=')
                os.environ[key] = value
    else:
        print(f"The file {env_file_path} does not exist.")
    url: str = os.environ.get("DB_URL")
    key: str = os.environ.get("DB_KEY")
    supabase: Client = create_client(url, key)
    time = datetime.datetime.now().isoformat()
    calculations = SignalCalculator.calculateSignal(tickerIn)
    response = supabase.table("tickers").upsert({"ticker":tickerIn,
                                                 "price":calculations[1],
                                                 "timestamp":time,
                                                 "signal":calculations[0]}).execute()
    return response
