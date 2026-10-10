"""Start de RoadMaat demo op http://localhost:8000 (nodig voor OpenStreetMap-tegels)."""
import http.server
import socketserver
import webbrowser
from functools import partial
from pathlib import Path

PORT = 8000
ROOT = Path(__file__).resolve().parent

handler = partial(http.server.SimpleHTTPRequestHandler, directory=str(ROOT))
socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(("127.0.0.1", PORT), handler) as server:
    url = f"http://localhost:{PORT}/fleetmanagement.html"
    print(f"RoadMaat draait op {url} (stoppen met Ctrl+C)")
    webbrowser.open(url)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("Gestopt.")