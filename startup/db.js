const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect(process.env.DATABASE_LOCAL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
        .then(con => {
            // console.log(con.connections);
            console.log('MongoDB Connected...')
        })
        .catch(err => console.log(`COULD NOT CONNECT TO MONGODB: ${err}`));
};