const express = require('express');
const router = express.Router();
const UserModel = require("../models/userModel.js")
const AuthorController = require("../controllers/userController")



router.post("/createUser", AuthorController.createAuthor)

router.get("/getUsersData", AuthorController.getAuthorData)



module.exports = router;