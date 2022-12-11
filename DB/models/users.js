const mongoose = require('mongoose')
const date= new Date
const year = date.getFullYear()
const month = date.getMonth()
const day = date.getDate()
const today = year+':'+ month + ':' + day

const users = mongoose.Schema({
    userid:{type: String,required:true,unique:true},
    username:{type:String, required:true, unique:true},
    email:{type:String, required:true, unique:true},
    phone:{type:Number, required:true, unique:true},
    balance:{type:Number, default:0},
    status:{type:String, default:'inactive'},
    package:{type:String, default:'none'},
    upline:{type:String, default:'none'},
    password:{type: String, required:true},
    created:{type:String, default:today}
})

const model = mongoose.models.users || mongoose.model('users', users)

module.exports = model