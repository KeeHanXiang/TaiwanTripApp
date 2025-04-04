
# 🇹🇼 TaiwanTripApp  
A simple money management app built with a **React frontend** and **Node.js + MySQL backend**.

---

## 📚 Documentation

### 🛠️ Project Setup

#### 1. Clone the repository

```bash
git clone https://github.com/your-username/TaiwanTripApp.git
cd TaiwanTripApp
```

---

### 🖥️ Setup Frontend (`/frontend`)

```bash
cd frontend
npx create-react-app .
```

Optionally, add this to `frontend/package.json` to proxy API requests to the backend:

```json
"proxy": "http://localhost:5000"
```

---

### 🔙 Setup Backend (`/backend`)

```bash
cd ../backend
npm init -y
npm install express cors mysql2 dotenv
```

Create the following files:

- `server.js` — Main Express app
- `db.js` — MySQL connection using environment variables
- `.env` — Stores sensitive DB info (explained below)

---

### 🛢️ MySQL Setup

1. Install MySQL using the [MySQL Installer](https://dev.mysql.com/downloads/installer/).
2. Use **MySQL Workbench** to connect and run:

```sql
CREATE DATABASE taiwantrip;
USE taiwantrip;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255)
);

INSERT INTO users (name, email) VALUES
('Alice Chen', 'alice@example.com'),
('Ben Tan', 'ben@example.com'),
('Cindy Lim', 'cindy@example.com'),
('Daniel Ng', 'daniel@example.com'),
('Elaine Teo', 'elaine@example.com');
```

---

### 🔐 Environment Variables

In the `backend/` folder, create a `.env` file:

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=taiwantrip
```

Ensure this line exists at the very top of `db.js`:

```js
require('dotenv').config();
```

Add `.env` to `.gitignore`:

```
.env
```

---

### 🔁 Running Both Frontend & Backend

At the **root project folder** (where `frontend/` and `backend/` are located):

```bash
npm init -y
npm install concurrently
```

Then, in the root `package.json`, add:

```json
"scripts": {
  "frontend": "npm start --prefix frontend",
  "backend": "nodemon backend/server.js",
  "dev": "concurrently \"npm run backend\" \"npm run frontend\""
}
```

To start both servers:

```bash
npm run dev
```

> ✅ Requires `nodemon` installed globally:
```bash
npm install -g nodemon
```

---

