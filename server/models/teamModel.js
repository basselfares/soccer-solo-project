const mongoose = require('mongoose')

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'team'
  })
    .then(() => console.log('Connected to Mongo DB.'))
    .catch(err => console.log(err));

    const Schema = mongoose.Schema

const teamSchema = new Schema ({
    teamName: String,
    slots: [Object],
})

const Team = mongoose.model("Team", teamSchema);

module.exports = Team

