#  Expense Tracker Application

A full-stack **MERN** (MongoDB, Express, React, Node.js) application to manage your daily **income** and **expenses** with visual insights.  


## 🚀 Features

### 🧩 Backend (Node.js + Express + MongoDB)
- RESTful APIs with full **CRUD** operations for transactions.
- **Joi** schema validation for request data.
- Secure headers using **Helmet**.
- **CORS** enabled for cross-origin requests.
- Centralized error and request logging using **Winston**.
- **MongoDB** integration using **Mongoose** ODM.


### 💻 Frontend (React + Redux Toolkit + Tailwind CSS)
- Clean and responsive UI built with **Tailwind CSS**.
- State management handled by **Redux Toolkit**.
- Add, view, and delete transactions in real-time.
- Toast notifications using **react-hot-toast**.
- Animated UI elements using **Framer Motion**.
- **Pie Chart visualization** using **react-chartjs-2**.
- Filtering and summary of income and expenses.

---


## 🧠 Tech Stack

| Layer | Technology |
|--------|-------------|
| Frontend | React.js, Redux Toolkit, Tailwind CSS, Vite |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Validation | Joi |
| Charts | Chart.js |
| Notifications | React Hot Toast |
| Logging | Winston |

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/job_assignment.git
cd job_assignment


2️⃣ Backend Setup

Go to the backend directory:

cd backend


Install dependencies:

npm install


Create a .env file inside /backend folder:

PORT=3000
MONGO_URI=your_mongodb_connection_string


Run the backend server:

npm start


The backend should now run on 👉 http://localhost:3000

3️⃣ Frontend Setup

Go to the frontend directory:

cd ../frontend


Install dependencies:

npm install


Create a .env file inside /frontend folder:

VITE_API_URL=http://localhost:3000/api


Run the frontend application:

npm run dev


The frontend should now run on 👉 http://localhost:5173

📡 API Endpoints
Method	Endpoint	Description
GET	/api/transactions	Get all transactions
POST	/api/transactions	Add a new transaction
PUT	/api/transactions/:id	Update a transaction
DELETE	/api/transactions/:id	Delete a transaction
🧾 Folder Structure
expense-tracker/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── validator/
│   │   └── index.js
│   ├── .env
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── redux/
│   │   ├── pages/
│   │   └── App.jsx
│   ├── .env
│   ├── vite.config.js
│   ├── package.json
│   └── README.md
│
└── README.md

📊 Dashboard Overview

The dashboard displays:

💵 Total Income and Total Expense

📈 Pie Chart Visualization

🧾 Transaction History

➕ Add New Transaction Form

🎛️ Filters by Type, Category, and Date

🧪 Environment Variables
Backend .env
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/expense_tracker

Frontend .env
VITE_API_URL=http://localhost:3000/api


Initialize Git

git init
git add .
git commit -m "Expense Tracker Machine Test"


Push your project:

git branch -M main
git remote add origin https://github.com/yourusername/expense-tracker.git
git push -u origin main

