const { count } = require("console")
const authorModel = require("../models/authorModel")


const createAuthor = async function(req, res) {
    let author = req.body
    const savedAuthor = await new authorModel(author).save()
    res.status(200).json(savedAuthor) //new method
}

module.exports.createAuthor = createAuthor