const { response } = require("express");
const jwt = require("jsonwebtoken");
const { findById } = require("../models/userModel");
const userModel = require("../models/userModel");



const createUser = async function(abcd, xyz) {
    try {
        let data = req.body;
        let savedData = await userModel.create(data);
        res.send(201).send({ msg: savedData });
        console.log(savedData)
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
};




const loginUser = async function(req, res) {
    try {
        let user = await userModel.findOne({ userName: req.body.emailId, password: req.body.password });
        if (!user)
            return res.status(404).send({
                status: false,
                msg: "username or password is invalid",
            });
        let token = jwt.sign({
                userId: user._id.toString(),
                batch: "thorium",
                organisation: "FunctionUp",
            },
            "functionup-thorium"
        );
        res.setHeader("x-auth-token", token);
        res.status(200).send({ status: true, data: token });
        console.log(user)
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
};




const getUserData = async function(req, res) {
    try {
        let userId = req.params.userId;
        let userDetails = await userModel.findById(userId);
        if (!userDetails)
            return res.status(401).send({ status: false, msg: "No such user exists" });
        res.status(200).send({ status: true, data: userDetails });
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
};




const updateUser = async function(req, res) {
    try {
        let userData = req.body;
        let userId = req.params.userId;
        let user = await userModel.findById(userId);
        if (!user) {
            return res.status(401).send("No such user exists");
        }
        let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, { $set: userData }, { new: true });
        res.status(201).send({ status: updatedUser, data: updatedUser });
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
};



const deleteUser = async function(req, res) {
    try {
        let userId = req.params.userId;
        let user = await userModel.findById(userId);
        if (!user) {
            return res.status(401).send("No such user exists");
        }
        let deleteUser = await userModel.findOneAndUpdate({ isDeleted: true })
        res.status(200).send({ msg: deleteUser })
    } catch (errr) {
        res.status(500).send({ error: err.message })
    }
};




const postMessage = async function(req, res) {
    try {
        let userId = req.params.userId;
        let user = await userModel.findById(userId);
        if (!user) {
            return res.status(401).send("No such user exists");
        }
        let message = req.body.message
        let updatedPosts = user.posts
        updatedPosts.push(message)
        let updatedUser = await userModel.findOneAndUpdate({ _id: user._id }, { posts: updatedPosts }, { new: true })
        return res.status(201).send({ status: true, data: updatedUser })
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
}


module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser
module.exports.postMessage = postMessage