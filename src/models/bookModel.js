const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({

    bookName: String,
    author_id: Number,
    price: Number,
    ratings: String
}, { timestamps: true });


module.exports = mongoose.model('Book', BookSchema)