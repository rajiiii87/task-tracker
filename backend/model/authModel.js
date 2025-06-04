const mongoose = require('mongoose')
const authSchema = new mongoose.Schema({
    username : {type:String },
    email : {type:String },
    password : {type:String },
    confirm_password : {type:String },
},{timestamps:true})

const authModel = mongoose.model('Auth',authSchema,'Auth')
module.exports = authModel