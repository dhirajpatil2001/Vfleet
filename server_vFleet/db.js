const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.mongo_URL).then(
    () => {
        console.log('Connect to database');
    }
)

    .catch((err) => {
        console.log('not connect to db ' + err);
    })