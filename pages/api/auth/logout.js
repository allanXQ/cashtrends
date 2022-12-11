import { serialize } from "cookie";

export default async function Logout(req,res){
    const serialized = serialize('authToken',null,{
        httpOnly:true,
        sameSite:'strict',
        maxAge: 60*60,
        path:'/',
        secure:process.env.NODE_ENV !== 'development'
      })
    
    res.setHeader("Set-Cookie", serialized)
    return res.json({status:200,message:'Logout successful'})   

}




