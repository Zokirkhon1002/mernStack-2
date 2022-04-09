const mongoose = require('mongoose');

const connectDB = async ()=> {
    try {
        const isConnect = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true

        })
        console.log(`MongoDB connected to: ${isConnect.connection.host}`)
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDB;