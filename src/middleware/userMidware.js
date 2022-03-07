 const express = require("express")

 const mid1 = function(req, res, next) {
     let header = req.headers["isfreeappuser"]
     let isAppFree
     if (!header) {
         return res.send({ msg: "Manadatory header missing" })
     }
     next()
 }

 module.exports.mid1 = mid1