"""
Simple Flask server to forward order form submissions to Telegram Bot.
"""

from flask import Flask, request, jsonify, make_response
from werkzeug.exceptions import HTTPException
import os
import requests

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

app = Flask(__name__)

TELEGRAM_SEND_URL = "https://api.telegram.org/bot{}/sendMessage"


def load_telegram_settings():
    return (
        os.environ.get("TELEGRAM_BOT_TOKEN"),
        os.environ.get("TELEGRAM_CHAT_ID")
    )


def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    return response


@app.after_request
def apply_cors_headers(response):
    return add_cors_headers(response)


@app.errorhandler(Exception)
def handle_error(e):
    if isinstance(e, HTTPException):
        response = jsonify({
            "ok": False,
            "error": e.description
        })
        response.status_code = e.code
    else:
        response = jsonify({
            "ok": False,
            "error": str(e)
        })
        response.status_code = 500

    return add_cors_headers(response)


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


@app.route("/order", methods=["POST"])
def order():

    data = request.get_json(force=True)

    name = data.get("name", "(не вказано)")
    contact = data.get("contact", "(не вказано)")
    message = data.get("message", "(не вказано)")

    text = (
        "Нове замовлення\n"
        f"Ім'я: {name}\n"
        f"Контакт: {contact}\n\n"
        f"Деталі:\n{message}"
    )

    BOT_TOKEN, CHAT_ID = load_telegram_settings()

    if not BOT_TOKEN or not CHAT_ID:
        return jsonify({
            "ok": False,
            "error": "Telegram credentials not configured"
        }), 500

    url = TELEGRAM_SEND_URL.format(BOT_TOKEN)

    payload = {
        "chat_id": CHAT_ID,
        "text": text
    }

    try:
        r = requests.post(url, data=payload, timeout=10)
        r.raise_for_status()

    except Exception as e:
        return jsonify({
            "ok": False,
            "error": str(e)
        }), 500

    return jsonify({"ok": True})


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 8001))
    )