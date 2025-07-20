# 🪙 Altcoin Assignment

A take-home project that fetches historical price data for a specified altcoin using CoinGecko’s API and displays it on a web interface. Built with Node.js and React.

---

## 🚀 Features

- Fetch price history of any altcoin via CoinGecko
- Modular frontend/backend architecture
- Redis for caching
- MariaDB to store snapshots of requested data

---

## 🤖 AI Assistance

AI tools were used to support and accelerate development in the following areas:

- 📄 Documentation: Helped draft this README and code documentation
- 🧠 Frontend Copy: Assisted in generating interface labels and user-facing text
- 💬 Commit Messages: Suggested concise and descriptive commit notes

These tools streamlined the development workflow while keeping full creative and technical control in human hands.

---

## 🛠️ Getting Started

Follow these steps to run the app locally:

### 1. Clone the Repository

```bash
git clone https://github.com/Hero-from-HeroPixel/altcoin-assignment.git
cd altcoin-assignment
```

### 2. Install Dependencies

Both the frontend and backend use Node.js. From the root directory, run:

Install frontend deps:

```bash
cd frontend && pnpm install
```

Install backend deps:

```bash
cd backend && pnpm install
```

### 3. Set Up Environment Variables

---
Docker compose variables:

Create a `.env` file in the root directory with the following:

```env
DB_ROOT_PASSWORD= #default 123
DB_NAME= #default altcoin_assignment
REDIS_PASSWORD= #default 123
```

Backend variables:

Create a `.env` file in the backend directory with the following:

```env
#Port on which the server should listen
PORT= #default 3000
#DB password -> must match password set in docker compose level
DB_PASSWORD= #default 123
DB_HOST= #default localhost
DB_USER= #default root
DB_NAME= #default altcoin_assignment
DB_PORT= #default 3306
REDIS_HOST= #default localhost
REDIS_PORT= #default 6379

#API key for CoinGecko
CRYPTO_API_KEY=
```

Frontend variables:

Create a `.env` file in the frontend directory with the following:

```env
#URI of API
VITE_BACKEND_URI= #default http://localhost:3000/api/v1
```

Adjust any other required variables based on your project logic.

### 4. Run the App

1. Start backend server

```bash
cd backend && pnpm start
```

2. Start frontend server

```bash
cd frontend && pnpm build && pnpm preview
```

---

## 🧪 Testing

Unfortunately ran out of time to complete tests

---

## 🧩 Technologies Used

| Stack           | Description                  |
|----------------|------------------------------|
| React           | Frontend UI framework         |
| Node.js         | Backend runtime environment   |
| Express         | API routing and logic         |
| CoinGecko API   | Crypto data provider           |

---

## 📁 Folder Structure

```plaintext
altcoin-assignment/
├── frontend/       # React app
├── backend/        # Express backend
├── README.md       # This file!
├── docker-compose.yml  #docker compose file for starting mariadb & redis instances
```

---
