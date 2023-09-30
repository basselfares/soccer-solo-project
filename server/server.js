require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const apiRouter = require('./routes/api');
const teamRouter = require('./routes/team');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);
app.use('/team', teamRouter);


app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(3010);
