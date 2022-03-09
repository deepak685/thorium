const jwt = require("jsonwebtoken")
const authenticate = function(req, res, next) {
    let token = req.headers["x-auth-token"]
    if (!token) return res.send({ status: false, msg: "token must be present in the request header" })
    let decodedToken = jwt.verify(token, 'functionup-thorium')
    if (!decodedToken) return res.send("token is invalid")
    next()
}


const authorise = function(req, res, next) {
    // comapre the logged in user's id and the id in request
    let userToBeModified = req.params.userId
    let token = req.headers["x-auth-token"]
    let decodedToken = jwt.verify(token, 'functionup-thorium')
    let userLoggedIn = decodedToken.userId
    if (userToBeModified != userLoggedIn) return res.send({ status: false, msg: 'User logged is not allowed to modify the requested users data' })


    //userId for the logged-in user


    next()
}

module.exports.authenticate = authenticate
module.exports.authorise = authorise