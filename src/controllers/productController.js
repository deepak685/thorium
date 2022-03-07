const { count } = require("console")
const ProductModel = require("../models/productModel")

const createProduct = async function(req, res) {
    let savedData = await ProductModel.create(req.body)
    res.send({ msg: savedData })
}


module.exports.createProduct = createProduct