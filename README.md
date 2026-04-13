# Basic Authentication API

Simple Node.js and Express API using HTTP Basic Authentication.

## Run

```bash
npm install
npm start
```

Server starts on `http://localhost:3000`.

## Endpoints

- `GET /` public status message
- `GET /public` public endpoint
- `GET /private` protected endpoint
- `GET /auth-check` protected endpoint returning authenticated username

## Default Credentials

- Username: `admin`
- Password: `password123`

You can override with environment variables:

- `BASIC_AUTH_USER`
- `BASIC_AUTH_PASS`
