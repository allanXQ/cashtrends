import axios from "axios";

export default async function handler (req,res){//==
    const{phone,amount} = req.body
    if(!phone){
        return res.json({status:'400', message:'fill in all required values'})
    }
    if(!amount){
        return res.json({status:'400', message:'fill in all required values'})
    }

    try {
        const url = " https://tinypesa.com/api/v1/express/initialize";
        try { 
        await axios({
            method: 'post',
            url: url,
            data: {
                amount:amount,
                msisdn:phone,
            },
            headers:{
                Apikey: "oGr5xpbiMcu",//process.env.TINY_KEY,
                "Content-Type": "application/json",
            },
          }).then((response)=>{
              if(response.status == 200){
                  return res.json({status:200, message:'STK push sent.Input pin to complete transaction'})
              }
          })
        } catch (error) {
            console.log(error)
            return res.json({status:400, message:'Request failed. Try again'})
        } 
        } catch (error) {
            //throw error
            return res.json({status:'500', message:'deposit unsuccessful'})
        }
    }
