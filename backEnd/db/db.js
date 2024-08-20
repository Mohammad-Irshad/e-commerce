const mongoose = require('mongoose')

// const mongoURI = i remove the connection string intentionally

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
