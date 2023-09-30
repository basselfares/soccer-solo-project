const mongoose = require('mongoose')

const Schema = mongoose.Schema

const playerInfoSchema = new Schema ({
    playerID: Number,
    playerImage: String,
    name: String,
    dob: Date,
    country: String,
    club: String,
    marketValue: Number
})

const Player = mongoose.model("playerInfo", playerInfoSchema);





module.exports = {
    Player
}
