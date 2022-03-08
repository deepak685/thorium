const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");


//01---Post api /createUser
const createUser = async function(req, res) {
    let savedData = await userModel.create(req.body);
    res.send({ msg: savedData });
};

//02---postapi  /login
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
        "SpiderMan"
    );
    res.setHeader("x-auth-token", token);
    res.send({ status: true, data: token });
    console.log(user)
};

//03--getapi--to get usersData based on authuntication
const getUserData = async function(req, res) {
    if (!decodedToken)
        return res.send({ status: false, msg: "token is invalid" });

    let userId = req.params.userId;
    let userDetails = await userModel.findById(userId);
    if (!userDetails)
        return res.send({ status: false, msg: "No such user exists" });

    res.send({ status: true, data: userDetails });
};

//04--updateapi to update usersData based on authuntication
const updateUser = async function(req, res) {
    let userId = req.params.userId;
    let user = await userModel.findById(userId);
    if (!user) {
        return res.send("No such user exists");
    }

    let userData = req.body;
    let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData);
    res.send({ status: updatedUser, data: updatedUser });
};

//05--delete api
const deleteUser = async function(req, res) {
    let userId = req.params.userId;
    if (!user) {
        return res.send("No such user exists");
    }
    let changedSatus = await userModel.findOneAndUpdate({ _id: userId }, { $set: { isDeleted: ture } }, { new: true }, { upsert: true })
    res.send({ msg: changedSatus })
};



module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.loginUser = loginUser;
module.exports.updateUser = updateUser
module.exports.deleteUser = deleteUser