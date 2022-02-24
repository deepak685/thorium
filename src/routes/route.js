const express = require('express');
const router = express.Router();


//assignment 1
let players = [];
router.post('/players/:name', function(req, res) {
    let playerName = player.name
    for (let i = 0; i < players.length; i++) {
        if (players[i].name == playerName) {
            res.send('player already exist')
        }
    }
    let player = req.body
    players.push(player)
    console.log('here is player', players)
    res.send(players)
});
//assignmenr 2
router.post('/players/:playerName/bookings/:bookingId', function(req, res) {
    let name = req.params.playerName
        //  let bookingId=req.params.bookingId
    let isPlayerPresent = false
    for (let i = 0; i < players.length; i++) {
        if (players[i].name == name) {
            isPlayerPresent = true

        }
    }
    if (isPlayerPresent) {
        return res.send('player not present')
    }
    let booking = req.body
    let bookingId = req.params.bookingId
    for (let i = 0; i < players.length; i++) {
        if (players[i].name == name) {
            for (let j = 0; j < players[i].bookings.length; j++) {
                if (players[i].bookings[j].bookingNumber.length == bookingId) {
                    return res.send('boooing id with this id is already present')
                }
            }
            players[i].bookings.push(players)
        }

    }

    res.send('palyer is present')
})




module.exports = router
    
