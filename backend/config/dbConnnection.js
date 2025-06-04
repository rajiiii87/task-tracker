const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URL)
.then((res)=>{
    console.log("Database Connection is Established");
})
.catch((err)=>{
    console.log("Error While Connecting DB");
})