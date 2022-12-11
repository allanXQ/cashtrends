// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDB from "../../../DB/mongoose"
import users from '../../../DB/models/users'
import referrals from '../../../DB/models/referrals'
import {hash} from 'bcrypt'
const uuid = require('uuid')
const id = uuid.v4()

connectDB()

export default async function handler(req, res) {
  // console.log(req.body)
  if(req.method === 'POST'){
    try {
      const body = req.body
      const username = body.username
      const firstname = body.firstname
      const lastname = body.lastname
      const email = body.email
      const phone = body.phone
      const password = body.password
      const cpassword = body.cpassword
      const upline = body.upline 

      console.log(body)
       
      if(firstname.length === 0 || lastname.length === 0 || username.length === 0 
        || email.length === 0 || phone.length === 0 || password.length === 0 || 
        cpassword.length === 0) return res.json({status:400,message:"All fields are required!"})
      const phone_regex = /^\d{10}$/
      if(!phone_regex.test(phone)) return res.json({status:400,message:'Invalid phone number'})
      const name_regex = /^[a-zA-Z0-9_\.]+$/
      if(!name_regex.test(firstname)) return res.json({status:400,message:'Invalid first name'})
      if(!name_regex.test(lastname)) return res.json({status:400,message:'Invalid last name'})
      if(!name_regex.test(username)) return res.json({status:400,message:'Invalid username'})
      const email_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if(!email_regex.test(email)) return res.json({status:400,message:'Invalid email'})
      if(password.length < 8) return res.json({status:400,message:'Password should contain 8 or more characters'})
      if(password !== cpassword) return res.json({status:400,message:'Passwords do not match'})
      const upline_regex = /^[a-zA-Z0-9-]+$/
      if(!upline_regex.test(upline)) return res.json({status:400,message:'Invalid upline'})

      const finduser = await users.findOne({username})
      const findemail = await users.findOne({email})
      const findphone = await users.findOne({phone})
      
      if(finduser) return res.json({status:400,message:'Invalid username'})
      if(findemail) return res.json({status:400,message:'Invalid email'})
      if(findphone) return res.json({status:400,message:'Invalid phone'})

      if(upline !== 'ADMIN'){
        const findupline = await users.findOne({userid:upline})
        if(!findupline) return res.json({status:400,message:'Upline not found'})
      }

      const encrypt = await hash(password, 10)
      const User = await users.create(
        {
          userid:id,
          username,
          firstname,
          lastname,
          email,
          phone,
          upline,
          password:encrypt
      })

      const create_referral = await referrals.create({
        userid:upline,
        downline:username,
        earnings:100
      })

      return res.json({status:200, message:'Account created'})
    } catch (error) {
      console.log(error)
      return res.json({status:400,message:'An error occurred'})
    }
  }

  else{return res.json({status:400,message:'Invalid method'})}
}


