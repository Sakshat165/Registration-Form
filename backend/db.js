const mongoose=require('mongoose')
const mongoURI="mongodb://localhost:27017/reg"
const connectToMongo= async ()=>{
    try{
        mongoose.set("strictQuery", false);
        mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");
        
    }
    catch(e)
    {
        console.log(e);
    }
    

}

module.exports=connectToMongo;