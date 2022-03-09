const jwt = require("jsonwebtoken");
const { findById } = require("../models/userModel");
const userModel = require("../models/userModel");



const createUser = async function(abcd, xyz) {
    let data = abcd.body;
    let savedData = await userModel.create(data);
    console.log(abcd.newAtribute);
    xyz.send({ msg: savedData });
    console.log(savedData)
};




const loginUser = async function(req, res) {
    let user = await userModel.findOne({ userName: req.body.emailId, password: req.body.password });
    if (!user)
        return res.send({
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
    res.send({ status: true, data: token });
    console.log(user)
};




const getUserData = async function(req, res) {

    let userId = req.params.userId;
    let userDetails = await userModel.findById(userId);
    if (!userDetails)
        return res.send({ status: false, msg: "No such user exists" });
    res.send({ status: true, data: userDetails });
};




const updateUser = async function(req, res) {
    let userData = req.body;
    let userId = req.params.userId;
    let user = await userModel.findById(userId);
    if (!user) {
        return res.send("No such user exists");
    }
    let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, { $set: userData }, { new: true });
    res.send({ status: updatedUser, data: updatedUser });
};



const deleteUser = async function(req, res) {
    let userId = req.params.userId;
    let user = await userModel.findById(userId);
    if (!user) {
        return res.send("No such user exists");
    }
    let deleteUser = await userModel.findOneAndUpdate({ isDeleted: true })
    res.send({ msg: deleteUser })
};




const postMessage = async function(req, res) {
    let userId = req.params.userId;
    let user = await userModel.findById(userId);
    if (!user) {
        return res.send("No such user exists");
    }
    let message = req.body.message
    let updatedPosts = user.posts
    updatedPosts.push(message)
    let updatedUser = await userModel.findOneAndUpdate({ _id: user._id }, { posts: updatedPosts }, { new: true })
    return res.send({ status: true, data: updatedUser })
}

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser
module.exports.postMessage = postMessage