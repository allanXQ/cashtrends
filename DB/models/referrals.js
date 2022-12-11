const mongoose = require('mongoose')

const referrals = mongoose.Schema({
    userid:{type:String, required:true},
    downline:{type:String, required:true, unique:true},
    earnings:{type:String, required:true,}
})

const model = mongoose.models.referrals || mongoose.model('referrals', referrals)

module.exports = model