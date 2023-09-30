const mongoose = require('mongoose')

// const MONGO_URI = 'mongodb+srv://bassel:38j2ct8SeD87Cbha@cluster0.bayvk7i.mongodb.net/?retryWrites=true&w=majority';

// mongoose.connect(MONGO_URI, {
//     // options for the connect method to parse the URI
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     // sets the name of the DB that our collections are part of
//     dbName: 'players'
//   })
//     .then(() => console.log('Connected to Mongo DB.'))
//     .catch(err => console.log(err));

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
