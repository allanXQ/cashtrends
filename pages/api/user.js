import { verify} from 'jsonwebtoken'
import user from '../../DB/models/users'
import connectDB from '../../DB/mongoose'

connectDB()

export default async function handler(req,res){
    if(req.method === 'GET'){
        try {
            const jwt_verify = verify(req.cookies.authToken,process.env.JWT_SECRET)
            const username = jwt_verify.username
            const user_data = await user.findOne({username})
            user_data.password = null
            return res.json({status:200,user_data})
  
        } catch (error) {
            console.log(error)
            return res.json({status:400,message:'An error occurred'})
        }
    }

    else{return res.json({status:400,message:'Invalid method'})}


}