const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URI;

const connectDB = async () =>{
    try {
        await mongoose.connect(mongoURI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        })
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection Error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;




// const { MongoClient } = require('mongodb');

// const mongoURI = process.env.MONGODB_URI;

// let dbConnection

// module.exports = {
//     connectionToDb: (cb) => {
//         MongoClient.connect(mongoURI)
//         .then((client) => {
//             dbConnection = client.db()
//             return cb()
//         })
//         .catch(err => {
//             console.log(err)
//             return cb(err)
//         })
//     },
//     getDb: () => dbConnection
// }
