from http.server import BaseHTTPRequestHandler
import sys
sys.path.append("../scripts") 
from scripts import updateAllTickers
from scripts import RsiComputer

class handler(BaseHTTPRequestHandler):
 
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type','text/plain')
        self.end_headers()
        self.wfile.write('Check db'.encode('utf-8'))
        updateAllTickers.updateAll()
        return