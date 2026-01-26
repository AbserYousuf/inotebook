const mongoose=require('mongoose')
const mongooseUrl='mongodb://localhost:27017/inotebook'

const ConnectToMongo=async()=>{
    try {
        await mongoose.connect(mongooseUrl)
        console.log("Databse connect sucessfully")
    } catch (error) {
        console.log("Database connection failed"+ {error})
       
    }
}
module.exports=ConnectToMongo;