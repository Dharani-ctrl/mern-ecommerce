const mongoose = require('mongoose');

const connectDatabase = ()=>{
    mongoose.connect(process.env.MONGO_URI,{
  
    }).then(con=>{
        console.log(`MogoDb Connected To the Host: ${con.connection.host}`)
    }).catch((err)=>{
        console.log(err)
    })
}


module.exports=connectDatabase;