import TickerIngest
import databaseUpdater
import os
def updateAll():
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
    tickers = TickerIngest.ingest(os.path.join(os.path.dirname(os.path.abspath(__file__)),"MasterTickerList.txt"))
    for ticker in tickers:
        databaseUpdater.update(ticker,url,key)
