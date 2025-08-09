const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Book = require('./models/Book');

dotenv.config({ path: '.env' });

const DB = process.env.MONGOOSE_URL.replace(
    '<PASSWORD>',
    process.env.MONGOOSE_PASSWORD
);
mongoose
    .connect(DB)
    .then(() => {
        console.log('Connected to DB');
    })
    .catch((err) => {
        console.log(err);
    });

//READ JASON FILE
const books = JSON.parse(
    fs.readFileSync(`${__dirname}/Bookstore.books.json`, 'utf-8')
);

//IMPORT DATA INTO DATABASE
const importBooksData = async () => {
    try {
        await Book.create(books);

        console.log('Done uploding');
    } catch (err) {
        console.log(err);
    }
    process.exit();
};

//DELETE ALL DATA FROM DB
const deleteBooksData = async () => {
    try {
        await Book.deleteMany({});

        console.log('Done Deleting');
    } catch (err) {
        console.log(err);
    }
    process.exit();
};

if (process.argv[2] === '--import') {
    importBooksData();
} else if (process.argv[2] === '--delete') {
    deleteBooksData();
}
