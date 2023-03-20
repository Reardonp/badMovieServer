console.log("hello from dbConn")
const mongoose = require('mongoose');



const connectDB = async () =>{
    try{
        await mongoose.connect("mongodb://localhost:27017/movies", {
            useUnifiedTopology:true,
            useNewUrlParser: true
            });
    } catch (err){
        console.log(err)
    }
    
}

module.exports =connectDB;