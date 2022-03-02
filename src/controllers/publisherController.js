const { count } = require("console")
const publisherModel = require("../models/publisherModel")

const createPublisher = async function(req, res) {
    let data = req.body
    let publiserCreated = await publisherModel.create(data) //save or create
    res.send({ data: publiserCreated })
}

module.exports.createPublisher = createPublisher