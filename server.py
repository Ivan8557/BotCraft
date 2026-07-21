"""
Simple Flask server to forward order form submissions to Telegram Bot.
Usage:
  1) Install dependencies: pip install -r requirements.txt
  2) Set environment variables: TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID
  3) Run: python server.py

This receives POST /order with JSON {name, contact, message}
and sends a formatted message to the configured Telegram chat.
"""
from flask import Flask, request, jsonify, make_response
from werkzeug.exceptions import HTTPException
import os
import requests

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

if os.path.exists(os.path.join(BASE_DIR, '.env')):
    with open(os.path.join(BASE_DIR, '.env'), 'r', encoding='utf-8') as fh:
        for line in fh:
            line = line.strip()
            if not line or line.startswith('#') or '=' not in line:
                continue
            key, value = line.split('=', 1)
            os.environ[key.strip()] = value.strip()

app = Flask(__name__)


def load_telegram_settings():
    if os.path.exists(os.path.join(BASE_DIR, '.env')):
        with open(os.path.join(BASE_DIR, '.env'), 'r', encoding='utf-8') as fh:
            for line in fh:
                line = line.strip()
                if not line or line.startswith('#') or '=' not in line:
                    continue
                key, value = line.split('=', 1)
                os.environ[key.strip()] = value.strip()
    return os.environ.get('TELEGRAM_BOT_TOKEN'), os.environ.get('TELEGRAM_CHAT_ID')

BOT_TOKEN, CHAT_ID = load_telegram_settings()

if not BOT_TOKEN or not CHAT_ID:
    print('Warning: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set. Server will still run but forwarding will fail.')

TELEGRAM_SEND_URL = 'https://api.telegram.org/bot{}/sendMessage'

def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    response.headers['Access-Control-Allow-Credentials'] = 'false'
    return response

@app.after_request
def apply_cors_headers(response):
    return add_cors_headers(response)

@app.errorhandler(Exception)
def handle_error(e):
    if isinstance(e, HTTPException):
        response = jsonify({'ok': False, 'error': e.description})
        response.status_code = e.code
    else:
        response = jsonify({'ok': False, 'error': str(e)})
        response.status_code = 500
    return add_cors_headers(response)

@app.route('/health', methods=['GET', 'OPTIONS'])
def health():
    if request.method == 'OPTIONS':
        print('OPTIONS /health received', request.headers.get('Origin'))
        response = make_response('', 200)
        return add_cors_headers(response)
    response = jsonify({'status':'ok'})
    return add_cors_headers(response), 200

@app.route('/order', methods=['POST', 'OPTIONS'])
def order():
    if request.method == 'OPTIONS':
        print('OPTIONS /order received', request.headers.get('Origin'))
        response = make_response('', 200)
        return add_cors_headers(response)

    data = request.get_json(force=True)
    name = data.get('name','(не вказано)')
    contact = data.get('contact','(не вказано)')
    message = data.get('message','(не вказано)')

    text = f"Нове замовлення\nІм'я: {name}\nКонтакт: {contact}\n\nДеталі:\n{message}"

    BOT_TOKEN, CHAT_ID = load_telegram_settings()

    if not BOT_TOKEN or not CHAT_ID:
        response = jsonify({'ok':False, 'error':'Telegram credentials not configured on server'})
        return add_cors_headers(response), 500

    url = TELEGRAM_SEND_URL.format(BOT_TOKEN)
    payload = {
        'chat_id': CHAT_ID,
        'text': text
    }
    try:
        r = requests.post(url, data=payload, timeout=10)
        r.raise_for_status()
    except Exception as e:
        message = 'Telegram delivery failed. Check the bot token and chat ID.'
        if '403' in str(e) or 'Forbidden' in str(e):
            message = 'Telegram rejected the bot credentials. Verify the bot token and chat ID.'
        response = jsonify({'ok':False, 'error': message})
        return add_cors_headers(response), 500

    response = jsonify({'ok':True})
    return add_cors_headers(response), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8001)
