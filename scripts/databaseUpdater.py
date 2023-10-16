import datetime
import os
import SignalCalculator
from supabase import create_client, Client
def update(tickerIn, dbURL, dbKey):
    supabase: Client = create_client(dbURL, dbKey)
    time = datetime.datetime.now().isoformat()
    calculations = SignalCalculator.calculateSignal(tickerIn)
    response = supabase.table("tickers").upsert({"ticker":tickerIn,
                                                 "price":calculations[1],
                                                 "timestamp":time,
                                                 "signal":calculations[0]}).execute()
    return response
