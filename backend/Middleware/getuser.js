const key = process.env.SECRET_KEY
const jwt=require('jsonwebtoken')
const TokenVerification=(req,res,next)=>{
    const token = req.header('authtoken')
    if(!token){
        return res.status(400).json({error:"please enter the authentication details first"})
    }
    try {
        const data =  jwt.verify(token,key)
        req.info=data.user
        next()
    } catch (error) {
         console.log(error)
         return res.status(401).json({msg:"Access denied"})
    }
}
module.exports=TokenVerification;
