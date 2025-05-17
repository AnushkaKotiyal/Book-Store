# 📚 Book Store

A simple Express.js application for browsing and reviewing books. Users can register, log in, post reviews for books, and explore books by ISBN, author, or title.

## 🚀 Features

- 🔐 User registration and login (with sessions)
- 📖 Get all books or search by:
  - ISBN
  - Author
  - Title
- ✍️ Post, update, and delete your reviews (only by logged-in users)
- 🌐 Public API access
- 🔧 Async/Await and Promises implemented for external data access

## 🛠️ Technologies Used

- Node.js
- Express.js
- Axios
- JavaScript
- JSON-based mock database

## 📂 Project Structure

expressBookReviews/
│
├── final_project/
│ ├── routes/
│ │ ├── general.js # Public routes (view books)
│ │ ├── auth_users.js # Authenticated routes (reviews, login, etc.)
│ ├── booksdb.js # Book data in JSON format
│ ├── index.js # App entry point
│ ├── package.json # Project metadata and dependencies
│
└── README.md


