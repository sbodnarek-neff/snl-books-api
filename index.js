const express = require('express');
const app =express();
const fs = require('fs');
const cors = require('cors');
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 9000
const { v4: uuidv4 } = require('uuid');


app.get('/', (req, res) => {
    // res.send('Hello, World!');
    const bookDetails = JSON.parse(fs.readFileSync('./data/book-details.json'))

    return res.status(200).json(bookDetails)
});

app.patch("/:id", (req, res) => {
    const { id } = req.params;
    const { read } = req.body;

    const data = JSON.parse(fs.readFileSync(`./data/book-details.json`));
    const updatedData = data.map((book) => {
        if (book.id === id) {
            return { ...book, read: read };
        }
        return book;
    });

    fs.writeFileSync(`./data/book-details.json`, JSON.stringify(updatedData));

    return res.status(200).json({ message: "Book updated successfully" });
});

app.post ('/', (req,res) => {
    const { title, author} = req.body;
    const addNewBook = {
        id: uuidv4(),
        title: title,
        author: author,
        year: 2024,
        image: "www.example.com",
        read: false,

    }
    const data = JSON.parse(fs.readFileSync(`./data/book-details.json`))

    fs.writeFileSync(`./data/book-details.json`, JSON.stringify([ addNewBook, ...data ]));

    return res.status(200).json(addNewBook)
  })

app.listen(PORT, () => {
    console.log('Server is running on port 9000');
});