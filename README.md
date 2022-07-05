# telegram-live-search-app

Implement live search for your Telegram bots' (user) data, through Telegram Web Apps

## 1.0 Build

```bash
docker-compose build
```

## 1.1 Run

Add `.env` file containing:

```bash
REACT_APP_HOST_GLOBAL=...
REACT_APP_PORT=...
REACT_APP_API_HOST=...
REACT_APP_API_PORT=...

```

And run React App with

```bash
docker-compose --env-file .env up -d
```
