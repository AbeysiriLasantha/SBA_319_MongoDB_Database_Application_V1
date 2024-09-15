require("dotenv").config();
const mongoose = require('mongoose');

const connectToDb = async () => {
    try {
        console.log("Inside connectToDb...");
        await mongoose.connect(process.env.DB_URL, {
       
        });
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Error connecting to the database:", error);
        throw error; // Rethrow the error so that the caller can handle it
    }
};

module.exports = connectToDb;