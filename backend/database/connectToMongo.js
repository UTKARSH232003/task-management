import mongoose from 'mongoose'

const connectToMongo = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to Database");
    }
    catch(error){
        console.log(`Error Connecting to Database: ${error.message}`);
    }
}
export default connectToMongo;