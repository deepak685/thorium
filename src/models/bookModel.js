const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookName: String,
    authorName: String,
    year: { type: Number, default: 2021 },
    tags: [String],
    stockAvailable: Boolean,
    prices: {
        indianPrice: String,
        europePrice: String,
    },
    pages: { type: Number }
}, { timestamps: true });


module.exports = mongoose.model('Book', bookSchema)