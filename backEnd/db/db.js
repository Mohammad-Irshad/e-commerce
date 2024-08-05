const mongoose = require('mongoose')

const mongoURI = "mongodb+srv://Mohammad_Irshad:ffn2kVq5DCU8G8Kp@neog.8ghcryo.mongodb.net/?retryWrites=true&w=majority&appName=neoG"

const initializeDatabase = async () => {
  try{
    const connection = await mongoose.connect(mongoURI, {
      useNewUrlParser : true,
      useUnifiedTopology : true
    })
    if(connection){
      console.log("Connected Successfully")
    }
  }catch(error){
    console.log("Connection failed : ", error)
  }
}

module.exports = {initializeDatabase}