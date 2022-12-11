import axios from 'axios'
import user from '../../DB/models/users'

const Activate = async (req,res) => {
    if(req.method === 'POST'){
        const {username,phone} = req.body
        try {
            const find_user = await user.findOne({username})
            if(find_user.status==='Active') return res.json({status:200, message:'Account already active.'})

            const url = " https://tinypesa.com/api/v1/express/initialize";
            await axios({
                method: 'post',
                url: url,
                data: {
                    amount:10,
                    msisdn:'+254' + phone,
                },
                headers:{
                    Apikey: process.env.TINY_KEY,
                    "Content-Type": "application/json",
                },
                }).then(async (response)=>{
                    if(response.status === 200){
                                        
                        return res.json({status:200, message:'STK push sent'})
                    }
                })
        } catch (error) {
        console.log(error)
        return res.json({status:400,message:'An error occurred'})
        }
    }      
    else{return res.json({status:400,message:'Invalid method'})}
}

export default Activate
