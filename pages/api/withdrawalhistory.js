import { verify } from 'jsonwebtoken'
import withdrawals from '../../DB/models/withdrawals'
import connectDB from '../../DB/mongoose'


connectDB()
export default async function handler(req,res){
    if(req.method === 'GET'){
        try {
            const jwt_verify = verify(req.cookies.authToken,process.env.JWT_SECRET)
            const username = jwt_verify.username
            const withdrawal_history = await withdrawals.find({username})
            return res.json({status:200,withdrawal_history})
  
        } catch (error) {
            console.log(error)
            return res.json({status:400,message:'An error occurred'})
        }
    }

    else{return res.json({status:400,message:'Invalid method'})}


}