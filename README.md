# 📝 Blog App

A simple yet powerful blog application built using **Node.js**, **Express**, **MongoDB**, and **EJS**. It features server-side rendering, session handling, admin routes, and a modular folder structure.

---

## 🚀 Features

- Full CRUD operations for blog posts
- EJS templating with layout support
- Express sessions with MongoDB store
- Cookie parsing and method override for RESTful routes
- Environment configuration via `.env`
- Organized routing and MVC-style structure
- Admin panel (via `/admin` routes)

---

## 📁 Folder Structure

project/ │ ├── public/ # Static assets (CSS, JS, images) ├── server/ │ ├── config/ # MongoDB connection config │ ├── helpers/ # Route helpers (e.g. isActiveRoute) │ ├── routes/ # Route files (main & admin) │ ├── views/ # EJS views ├── layouts/ # EJS layout templates ├── .env # Environment variables ├── app.js # Entry point

markdown
Copy
Edit

---

## 🛠️ Tech Stack

- **Node.js**
- **Express**
- **MongoDB + Mongoose**
- **EJS**
- **express-session** + **connect-mongo**
- **dotenv**
- **cookie-parser**
- **method-override**

---

## ⚙️ Setup & Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aftabmumtaz123/blog_app.git
   cd blog_app
Install dependencies

bash
Copy
Edit
npm install
Add environment variables

Create a .env file in the root directory and add your MongoDB URI:

env
Copy
Edit
MONGODB_URI=mongodb://localhost:27017/blog_app
PORT=3000
Start the app

bash
Copy
Edit
npm start
Open your browser and visit:
http://localhost:3000

📸 Screenshots (Optional)
Add some UI screenshots here to show off your app's layout and features!

📌 TODO
Add user authentication

Comment system

Pagination

Rich text editor

Deploy on Render or Vercel

📄 License
MIT License

👨‍💻 Author
Aftab Mumtaz
🔗 GitHub

