const { constants } = require("buffer")
const { count } = require("console")
const authorModel = require("../models/authorModel")
const bookModel = require("../models/bookModel")
const publisherModel = require("../models/publisherModel")

const createBook = async function(req, res) {
    //validate author
    let book = req.body
    let author_id = book.author_id
    let publisherId = book.publisher
    if (!author_id) {
        res.status(400).json({ msg: "authorId not present" })
    }
    const authorInfo = await authorModel.findById(author_id)
    if (!authorInfo) {
        res.status(400).json({ msg: "authorinfo not present" })
    }

    //validate publisher
    let { Sname, headQuarter } = req.body
    if (!publisherId) {
        res.status(400).json({ msg: "publisherId not present" })
    }
    const publisherInfo = await publisherModel.findById(publisherId)
    if (!publisherInfo) {
        res.status(400).json({ msg: "authorinfo not present" })
    }

    let bookCreated = await bookModel.create(book)
    return res.send({ data: bookCreated })
}


const getAllBooks = async function(req, res) {
    let allbooks = await bookModel.find().populate('author publisher')
    res.send({ data: "allbooks" })
}

module.exports.createBook = createBook
module.exports.getAllBooks = getAllBooks