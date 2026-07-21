BotCraft — локальна версія сайту з формою замовлення, яка пересилає повідомлення в Telegram через Flask сервер.

Швидка інструкція

1) Створіть Telegram-бота в BotFather та отримайте токен (не вставляйте токен у цей репозиторій або чат).
2) Дізнайтесь свій `CHAT_ID` (можна використати @userinfobot або виконати getUpdates після того, як хтось напише вашому боту).
3) Скопіюйте `.env.example` у `.env` або встановіть змінні оточення:

PowerShell:

```powershell
$env:TELEGRAM_BOT_TOKEN='ВАШ_БОТ_ТОКЕН'
$env:TELEGRAM_CHAT_ID='ВАШ_CHAT_ID'
python -m pip install -r requirements.txt
python server.py
```

Linux/macOS:

```bash
export TELEGRAM_BOT_TOKEN='ВАШ_БОТ_ТОКЕН'
export TELEGRAM_CHAT_ID='ВАШ_CHAT_ID'
python -m pip install -r requirements.txt
python server.py
```

4) Відкрийте сайт: http://localhost:8000 — форма надсилатиме запити на `http://localhost:8001/order`.

Безпека

- Якщо ви вставили токен у чат — негайно скасуйте (revoke) токен у BotFather і згенеруйте новий.
- Не зберігайте секрети в репозиторії.

Якщо хочете, я можу:
- Тимчасово перевірити відправку (ви запустите сервер локально і надішлете приклад форми),
- Допомогти отримати `CHAT_ID` або створити новий бот разом із інструкцією.
