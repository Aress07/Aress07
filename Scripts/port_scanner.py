import pyfiglet
import sys
import socket
from datetime import datetime

ascii_banner = pyfiglet.figlet_format("PORT SCANNER")
print(ascii_banner)

target = str(input("Target IP: "))

print("_" * 50)
print("[SCANNING TARGET] ...")
print("Scanning Started at: " + str(datetime.now()))
print("_" * 50)

try:
    for port in range(1, 65535):
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        socket.setdefaulttimeout(0.5)

        result = s.connect_ex((target, port))
        if result == 0:
            print(f"[*] Port {port} is open.")
        s.close()
except KeyboardInterrupt:
    print("\n [EXITING] ...")
    sys.exit()
except socket.error:
    print("\ [HOST NOT RESPONDING]")
    sys.exit()