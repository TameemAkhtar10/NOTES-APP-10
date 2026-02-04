let mongoose = require('mongoose');
let connecttoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to MongoDB');
    } catch (error) {       
        console.log('Error connecting to MongoDB:', error);
    }
}
module.exports = connecttoDB;