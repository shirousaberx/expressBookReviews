const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
        if (!isValid(username)) {
            users.push({
                "username": username,
                "password": password
            })
    
            res.send(username + " successfully registered");
        } else {
            res.status(404).send("User already exists!")
        }
    } else {
        res.status(404).send("Unable to register user.")
    }

});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
	let promise = new Promise((resolve, reject) => {
		res.send(JSON.stringify(books, null, 4));
		resolve("successfully sending book list");
	}).then((message) => {
		console.log(message)
	})
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
	let promise = new Promise((resolve, reject) => {
		const isbn = req.params.isbn;
		res.json(books[isbn])
		resolve("successfully sending book details based on isbn")
	}).then((message) => {
		console.log(message)
	})
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
	let promise = new Promise((resolve, reject) => {
		const author = req.params.author;

		let isFound = false;

		for (key in books) {
			if (books[key].author == author) {
				res.json(books[key])
				isFound = true;
				break;
			}
		}

		if (!isFound) {
			res.status(404).send("author not found")
		}

		resolve("successfully sending book details based on author")

	}).then((message) => {
		console.log(message)
	})
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {

	let promise = new Promise((resolve, reject) => {
		const title = req.params.title;

		let isFound = false;

		for (key in books) {
			if (books[key].title == title) {
				res.json(books[key])
				isFound = true;
				break;
			}
		}

		if (!isFound) {
			res.status(404).send("title not found")
		}

		resolve("successfully sending book details based on title")

	}).then((message) => {
		console.log(message)
	})
  
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
	let promise = new Promise((resolve, reject) => {
		const title = req.params.title;

		let isFound = false;

		const isbn = req.params.isbn;
		if (isbn in books) {
			res.send(books[isbn].reviews);
			isFound = true;
		}

		if (!isFound) {
			res.status(404).send("isbn not found");
		}

		resolve("successfully sending book review based on isbn")

	}).then((message) => {
		console.log(message)
	})
});

module.exports.general = public_users;
