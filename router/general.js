const { default: axios } = require('axios');
const express = require('express');
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const books=require('./booksdb.js');

public_users.post("/register", (req,res) => {
  //Write your code here
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  if (!isValid(username)) {
    return res.status(409).json({ message: "Username already exists." });
  }

  users.push({ username, password });
  return res.status(200).json({ message: "User registered successfully." });
});

public_users.get("/books", (req, res) => {
  return res.status(200).json(books);
});


// Get book details based on ISBN
public_users.get("/isbn/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (book) {
    return res.status(200).json(book);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

  
// Get book details based on author
public_users.get("/author/:author", (req, res) => {
  const author = req.params.author.toLowerCase();
  const filteredBooks = Object.values(books).filter(book =>
    book.author.toLowerCase() === author
  );

  return res.status(200).json(filteredBooks);
});


// Get all books based on title
public_users.get("/title/:title", (req, res) => {
  const title = req.params.title.toLowerCase();
  const filteredBooks = Object.values(books).filter(book =>
    book.title.toLowerCase() === title
  );
  return res.status(200).json(filteredBooks);
});


// Get the book list available in the shop acync
public_users.get('/async',async (req, res)=> {
  //Write your code here
  try {
    const response = await axios.get('http://localhost:5000/async-books');
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching book list" });
  }
});

// Get book details based on ISBN async
public_users.get('/async/isbn/:isbn',async function (req, res) {
  //Write your code here
  const isbn=req.params.isbn;
  const response=await axios.get('http://localhost:5000/async-books');
  const book=response.data.books[isbn];
  if(book){
    return res.status(200).json(book);
  }else{
    return res.status(404).json({ message: "Book not found." });
  }
 });
  
// Get book details based on author
public_users.get('/async/author/:author',async function (req, res) {
  //Write your code here
  const author=req.params.author;
  const response=await axios.get('http://localhost:5000/async-books');
  const book=Object.values(response.data.books).filter((book)=>book.author==author);
  if(book.length>0){
    return res.status(200).json(book);
  }else{
    return res.status(404).json({ message: "No Books found by that author." });
  }
});

// Get all books based on title
public_users.get('/async/title/:title',async function (req, res) {
  //Write your code here
  const title=req.params.title;
  const response=await axios.get('http://localhost:5000/async-books');
  const book=Object.values(response.data.books).filter((book)=>book.title==title);
  if(book.length>0){
    return res.status(200).json(book);
  }else{
    return res.status(404).json({ message: "No Books found by this title." });
  }

});

//  Get book review
public_users.get('/async/review/:isbn',async function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const response=await axios.get('http://localhost:5000/async-books');
  const book = response.data.books[isbn];
  if (book) {
    return res.status(200).json(book.reviews);
  } else {
    return res.status(404).json({ message: "Book not found." });
  }
});

module.exports.general = public_users;
