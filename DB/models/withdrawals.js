const mongoose = require('mongoose')
const date= new Date
const year = date.getFullYear()
const month = date.getMonth()
const day = date.getDate()
const hours = date.getHours()
const minutes = date.getMinutes()
const today = year+':'+ month + ':' + day +' ' + hours + ':' + minutes


const Withdrawals = new mongoose.Schema({
    username:{type: String},
    phone:{type: Number, required:true},
    amount:{type: Number, required:true},
    status:{type: String, default:'pending'},
    created:{type:String, default:today}
})

const model = mongoose.models.Withdrawals || mongoose.model('Withdrawals', Withdrawals)

module.exports = model 