const { count } = require("console")
const bookModel = require("../models/bookModel")
const authorModel = require("../models/authorModel")

const createNewAuthor = async function(req, res) {
    const data = req.body
    const savedData = await authorModel.create(data)
    res.send({ msg: savedData })
}

const createNewBook = async function(req, res) {
    const book = req.body
    const saved = await bookModel.create(book)
    res.send({ msg: saved })
}
const allBooks = async function(req, res) {
    const authorDetails = await authorModel.find({ authorName: "Chetan Bhagat" })
    const id = authorDetails[0].author_id
    const booksName = await bookModel.find({ author_id: id }).select({ bookName: 1 })
    res.send({ msg: booksName })
}

const updatedBookPrice = async function(req, res) {
    const bookDetails = await bookModel.find({ bookName: "Two States" })
    const id = bookDetails[0].author_id
    const authorN = await authorModel.find({ author_id: id }).select({ bookName: 1, _id: 0 })
    const bkName = bookDetails[0].bookName
    const updatedPrice = await bookModel.findOneAndUpdate({ name: bkName }, { price: 100 }, { new: true })
    res.send({ msg: authorN, updatedPrice })
}

const authorsName = async function(req, res) {
    const booksId = await bookModel.find({ price: { $gt: 50, $lte: 100 } }).select({ author_id: 1, _id: 0 })
    const id = booksId.map(inp => inp.author_id)
    let temp = []
    for (let i = 0; i < id.length; i++) {
        let x = id[i]
        const author = await authorModel.find({ author_id: x }).select({ authorName: 1, _id: 0 })
        temp.push(author)
    }
    const authorName = temp.flat()
    res.send({ msg: authorName })
}

module.exports.createNewAuthor = createNewAuthor
module.exports.createNewBook = createNewBook
module.exports.allBooks = allBooks
module.exports.updatedBookPrice = updatedBookPrice
module.exports.authorsName = authorsName



// const updateBooks = async function(req, res) {
//     let data = req.body // {sales: "1200"}
//         // let allBooks= await BookModel.updateMany( 
//         //     { author: "SK"} , //condition
//         //     { $set: data } //update in data
//         //  )
//     let allBooks = await BookModel.findOneAndUpdate({ authorName: "ABC" }, //condition
//         { $set: data }, //update in data
//         { new: true, upsert: true }, // new: true - will give you back the updated document // Upsert: it finds and updates the document but if the doc is not found(i.e it does not exist) then it creates a new document i.e UPdate Or inSERT  
//     )

//     res.send({ msg: allBooks })
// }

// const deleteBooks = async function(req, res) {
//     // let data = req.body 
//     let allBooks = await BookModel.updateMany({ authorName: "FI" }, //condition
//         { $set: { isDeleted: true } }, //update in data
//         { new: true },
//     )

//     res.send({ msg: allBooks })
// }




// CRUD OPERATIONS:
// CREATE
// READ
// UPDATE
// DELETE