const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(req)

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
    }

    res.status(404).send("Unable to register user.")
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here

  return res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
	const isbn = req.params.isbn;

	return res.json(books[isbn])
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;

	for (key in books) {
		if (books[key].author == author) {
			res.json(books[key])
		}
	}

	return res.status(404).send("author not found")
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;

	for (key in books) {
		if (books[key].title == title) {
			res.json(books[key])
		}
	}

	return res.status(404).send("title not found")
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
	if (isbn in books) {
		res.send(books[isbn].review);
	}

	res.status(404).send("isbn not found");

});

module.exports.general = public_users;
