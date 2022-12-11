const mongoose = require('mongoose')
const date= new Date
const year = date.getFullYear()
const month = date.getMonth()
const day = date.getDate()
const hours = date.getHours()
const minutes = date.getMinutes()
const today = year+':'+ month + ':' + day +' ' + hours + ':' + minutes

const Activation_fees = new mongoose.Schema({
    username:{type: String, required:true},
    amount:{type: Number, required:true,default:150},
    mpesa_ref:{type: String, required:true},
    created:{type: String, default:today}
})

const model = mongoose.models.Activation_fees || mongoose.model('Activation_fees', Activation_fees)

module.exports = model 