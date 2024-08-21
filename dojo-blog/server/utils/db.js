require("dotenv").config()

const mongoose=require("mongoose");


const connectDb=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        
        console.log("Connection Successful to database");
    } catch (error) {
        console.error("Database connection failed");
        console.log(error);
        
        process.exit(0);
    }
}

module.exports=connectDb;