const mongoose = require('mongoose')
const date= new Date
const year = date.getFullYear()
const month = date.getMonth()
const day = date.getDate()
const hours = date.getHours()
const minutes = date.getMinutes()
const today = year+':'+ month + ':' + day +' ' + hours + ':' + minutes

const Deposits = new mongoose.Schema({
    phone:{type: String, required:true},
    amount:{type: Number, required:true},
    mpesa_ref:{type: String, required:true},
    created:{type: String, default:today}
})

const model = mongoose.models.Deposits || mongoose.model('Deposits', Deposits)

module.exports = model 