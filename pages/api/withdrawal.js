import withdraw from '../../DB/models/withdrawals'
import user from '../../DB/models/users'


export default async function handler (req,res){//==
    const{username,phone,amount} = req.body
    if(!phone){
        return res.json({status:'400', message:'fill in all required values'})
    }
    if(!amount){
        return res.json({status:'400', message:'fill in all required values'})
    }

    // if(parseInt(amount) < 300) return res.json({status:'400', message:'Withdrawal limit is 300ksh'})


    try {
        const finduser = await user.findOne({username})
        if(parseInt(amount) > parseInt(finduser.balance)) return res.json({status:'400', message:'Insufficient balance'})
        await withdraw.create({
            username,
            phone,
            amount,
            status:"pending"
        })
        return res.json({status:'200', message:'Withdrawal Successful'})
        
        } catch (error) {
            console.log(error)
            return res.json({status:'500', message:'Withdrawal unsuccessful'})
        }
    }
