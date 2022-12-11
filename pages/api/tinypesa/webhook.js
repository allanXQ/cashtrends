import connectDB from "../../../DB/mongoose"
import user from  '../../../DB/models/users'
import deposit from '../../../DB/models/deposits'
import activation_fees from '../../../DB/models/activation_fees'

connectDB()

export default async function handler (req, res){
    console.log(req.body)

    //console.log(req.body.Body) // Call your action on the request here
    const metadata = req.body.Body.stkCallback.CallbackMetadata
    const stkcallback = req.body.Body.stkCallback
    console.log(metadata)

    try {
        


        if(stkcallback.ResultCode == 0){
            const phone = metadata.Item[4]['Value']
            const phonee = phone.toString().slice(3)
            const amount = metadata.Item[0]['Value']
            const mpesa_ref = metadata.Item[1]['Value']
            const transaction_date = metadata.Item[2]['Value']
            const find_user = await user.findOne({phone:phonee})
            console.log(find_user)
            if(find_user.status === 'inactive'){
                await user.updateOne(
                    {
                        phonee
                    },
                    {
                        $set:{
                            status:'Active',
                            package:'Lite'
                        }
                    }
                )     
                await activation_fees.create({
                    username:find_user.username,
                    mpesa_ref
                })

                const user_upline=find_user.upline
                const upline = await user.findOne({username:user_upline})
                if(upline!=='ADMIN'){
                const new_upline_balance = parseInt(upline.balance)+100
                await user.updateOne({
                    username:upline,
                    },
                    {
                        $set:{balance:new_upline_balance}
                    }
                )
                }
                
                return    
            }

           
            const create_deposit = await deposit.create({
            phone:phonee,
            amount,
            mpesa_ref,
            created:transaction_date
            })
            if(create_deposit){
                console.log('createeeeeeeeeeeeeeeeee')
            }
            // if(!create_deposit){
            //     return res.json({status:'400', message:'deposit failed'})
            //     }
                //const phon = metadata.Item[4]['Value']
            const phone_number = phonee//phon.toString().slice(3)
            const update_amount = metadata.Item[0]['Value']
            //const phone_number = '0' + phone_no
            console.log(phone_number)
            // const find_user = await user.findOne({phone:phone_number}).lean()
            // if(!find_user){
            //     console.log('user not found')
            //     return(res.json({status:'400', message:'deposit failed'}))
            // }
            const curr_balance = find_user.balance
            const user_update = await user.updateOne(
                {phone:phone_number},
                {
                    $set:{balance:curr_balance+update_amount}
                }
            )
        }        
        } catch (error) {
            console.log(error)
        return(res.json({status:'400', message:'deposit failed'}))

    }   
}
