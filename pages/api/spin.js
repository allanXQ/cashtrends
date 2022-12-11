// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDB from "../../DB/mongoose"
import user from '../../DB/models/users'
import spins from '../../DB/models/spins'
import { verify } from "jsonwebtoken"

connectDB()

export default async function handler(req, res) {
  // console.log(req.body)
  if(req.method === 'POST'){
    try {
      const {staked,username} = req.body
      const userdata = await user.findOne({username})
      const user_balance = userdata.balance
      if(parseInt(staked)>parseInt(user_balance)) return res.json({status:400,message:'Insufficient balance'})
      const new_balance = parseInt(user_balance) - parseInt(staked)
      console.log(new_balance)
      
      // await user.updateOne(
      //   {username},
      //   {
      //     $set:{balance:new_balance}
      //   }
      // )
      const userupdate = await user.updateOne(
        {username},
        {
          $set:{balance:new_balance}
        }
        )

      let deg = 0;
      let zoneSize = 45; // deg

      // Counter clockwise
      const symbolSegments = {
        1: 0.5,
        2: 0,
        3: 6,
        4: 5,
        5: 4,
        6: 3,
        7: 2,
        8: 1,
      }


      deg = Math.floor(2880 + Math.random() * 90)
      if(deg === undefined) deg = 2930
      let actualDeg = deg % 360;
      if(actualDeg === 0) {
        deg=2930
        actualDeg = 50
      }

      const winningSymbolNr = Math.ceil(actualDeg / zoneSize);
      const segment_value = symbolSegments[winningSymbolNr];
      const won = staked * segment_value
      console.log(actualDeg,winningSymbolNr,segment_value,won)

      await spins.create({
      username,
      stake:staked,
      won
      })

      const newbalance = parseInt(new_balance)+won
      await user.updateOne(
      {username},
      {
        $set:{balance:newbalance}
      }
      )

      
      return res.json({status:200,deg})

    } catch (error) {
      console.log(error)
      return res.json({status:400,message:'An error occurred'})
    }
  }

  else{return res.json({status:400,message:'Invalid method'})}
}
