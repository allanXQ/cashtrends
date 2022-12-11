import { verify } from 'jsonwebtoken'
import deposits from '../../DB/models/deposits'
import users from '../../DB/models/users'

import connectDB from '../../DB/mongoose'

connectDB()

export default async function handler(req,res){
    if(req.method === 'GET'){
    
        try {
            const jwt_verify = verify(req.cookies.authToken,process.env.JWT_SECRET)
            const username = jwt_verify.username
            const user = await users.findOne({username})
            const deposit_history = await deposits.find({phone:user.phone})
            return res.json({status:200,deposit_history})
  
        } catch (error) {
            console.log(error)
            return res.json({status:400,message:'An error occurred'})
        }
    }

    else{return res.json({status:400,message:'Invalid method'})}


}