import { verify } from 'jsonwebtoken'
import referrals from '../../DB/models/referrals'
import connectDB from '../../DB/mongoose'

connectDB()

export default async function handler(req,res){
    if(req.method === 'GET'){

        try {
            const jwt_verify = verify(req.cookies.authToken,process.env.JWT_SECRET)
            const username = jwt_verify.username
            const downlines = await referrals.find({userid:username})
            if(downlines){
            return res.json({status:200,downlines})
  
            }
            else{
                return res.json({status:400,message:'downlines'})
            }
            
        } catch (error) {
            console.log(error)
            return res.json({status:400,message:'An error occurred'})
        }
    }

    else{return res.json({status:400,message:'Invalid method'})}


}