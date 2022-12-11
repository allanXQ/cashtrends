const mongoose = require('mongoose')
const date= new Date
const year = date.getFullYear()
const month = date.getMonth()
const day = date.getDate()
const today = year+':'+ month + ':' + day

const spins = mongoose.Schema({
    username:{type:String, required:true},
    stake:{type:Number, default:0},
    won:{type:Number, required:true},
    created:{type:String, default:today}
})

const model = mongoose.models.spins || mongoose.model('spins', spins)

module.exports = model