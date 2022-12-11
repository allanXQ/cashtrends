// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDB from "../../../DB/mongoose"
import users from '../../../DB/models/users'
import {compare} from 'bcrypt'
import {sign} from 'jsonwebtoken'
import {serialize} from 'cookie'

connectDB()

export default async function handler(req, res) {
  // console.log(req.body)
  if(req.method === 'POST'){
    try {
      const body = req.body
      const username = body.username
      const password = body.password
      
      // console.log(req.body)
      const name_regex = /^[a-zA-Z0-9_\.]+$/
      if(username.length === 0 || password.length === 0) return res.json({status:400,message:"All fields are required!"})
      if(!name_regex.test(username)) return res.json({status:400,message:'Invalid username'})
      if(password.length < 8) return res.json({status:400,message:'Password should contain 8 or more characters'})

      const finduser = await users.findOne({username})
      if(!finduser) return res.json({status:400,message:'Invalid username/password'})
      const user_password = finduser.password
      const match = await compare(password,user_password)
      if(!match) return res.json({status:400,message:'Invalid username/password'})

      const signature = {username, id:finduser.userid}
      const authToken= sign(signature,process.env.JWT_SECRET,{expiresIn:'24h'})

      const serialized = serialize('authToken',authToken,{
        httpOnly:true,
        sameSite:'strict',
        maxAge: 60*60*24,
        path:'/',
        secure:process.env.NODE_ENV !== 'development'
      })
      res.setHeader("Set-Cookie", serialized)
      
      return res.json({status:200,message:'Login successful'})

    } catch (error) {
      console.log(error)
      return res.json({status:400,message:'An error occurred'})
    }
  }

  else{return res.json({status:400,message:'Invalid method'})}
}
