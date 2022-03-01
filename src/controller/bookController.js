const BookModel = require("../models/bookModel")

//01
const createBook = async function(req, res) {
    let data = req.body
    let savedData = await BookModel.create(data)
    res.send({ msg: savedData })
}

//02
const getBooksData = async function(req, res) {
    let allBooks = await BookModel.find().select({ bookName: 1, authorName: 1, _id: 0 })
    res.send({ msg: allBooks })
}

//03
const getBooksInYear = async function(req, res) {
    let year = req.body;
    let booksInYear = await BookModel.find(year)
    res.send(booksInYear)
}

//04
const getParticularBooks = async function(req, res) {
    let cond = req.body;
    if ("bookName" in cond) {
        let particularBooks = await BookModel.find({ bookName: { $regex: cond.bookName } })
        return res.send(particularBooks)
    } else if ("authorName" in cond) {
        let particularBooks = await BookModel.find({ authorName: { $regex: cond.authorName } })
        return res.send(particularBooks)
    } else if ("tags" in cond) {
        if (cond.tags in BookModel.tags) {
            let particularBooks = await BookModel.find({ tags: cond.tags })
            return res.send(particularBooks)
        }
    } else if ("prices" in cond) {
        if ("indianPrice" in cond.prices) {
            let particularBooks = await BookModel.find({ "prices.indianPrice": cond.prices.indianprice })
            return res.send(particularBooks)
        } else if ("europePice" in cond) {
            let particularBooks = await BookModel.find({ "prices.europePrice": cond.prices.europePrice })
            return res.send(particularBooks)
        }
    } else {
        let particularBooks = await BookModel.find(cond)
        return res.send(particularBooks)
    }
}

//05
const getInrBooks = async function(req, res) {
    let inrBooks = await BookModel.find({ "prices.indianPrice": { $in: ["500", "200", "100"] } })
    res.send(inrBooks)
}

//06
const getRandomBooks = async function(req, res) {
    let getRandomBooks = await BookModel.find({ $or: [{ stockAvailable: true }, { pages: { $gt: 500 } }] })
    res.send(getRandomBooks)
}
module.exports.createBook = createBook
module.exports.getBooksData = getBooksData
module.exports.getBooksInYear = getBooksInYear
module.exports.getParticularBooks = getParticularBooks
module.exports.getInrBooks = getInrBooks
module.exports.getRandomBooks = getRandomBooks