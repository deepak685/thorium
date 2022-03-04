const { constants } = require("buffer")
const { count } = require("console")
const authorModel = require("../models/authorModel")
const bookModel = require("../models/bookModel")
const publisherModel = require("../models/publisherModel")

const createBook = async function(req, res) {
    //validate author
     let book = req.body
    let authorId = req.body.author
    let publisherId = req.body.publisher
    if (!author_id) {
        res.status(400).json({ msg: "authorId not present" })
    }
    const authorInfo = await authorModel.findById(author_id)
    if (!authorInfo) {
        res.status(400).json({ msg: "authorinfo not present" })
    }

    //validate publisher
    
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
    res.send({ data: allbooks })
}
const updatedBooks = async function(req, res) {

    let hardCoverPublishers = await publisherModel.find({
        name: { $in: ["Penguin", "HarperCollins"] },
    });
    let publisherIds = hardCoverPublishers.map((p) => p._id);

    await bookModel.updateMany({ publisher: { $in: publisherIds } }, { isHardCover: true });


    let highRatedAuthors = await authorModel.find({ rating: { $gt: 3.5 } });
    let authorIds = highRatedAuthors.map((a) => a._id);

    await bookModel.updateMany({ author: { $in: authorIds } }, { $inc: { price: 10 } });

    let updatedBooks = await bookModel.find();
    res.send({ updatedBookCollection: updatedBooks });
};





module.exports.createBook = createBook
module.exports.getAllBooks = getAllBooks
module.exports.updatedBooks = updatedBooks
