const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken")
const userController = require("../controllers/userController")
const midleware = require("../middleware/auth")


router.get("/test-me", function(req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.createUser)

router.post("/login", userController.loginUser)

router.get("/users/:userId", midleware.mid1, userController.getUserData)

router.put("/users/:userId", midleware.mid1, userController.updateUser)

router.put("deleteUser/:userId", midleware.mid1, userController.deleteUser)

module.exports = router;