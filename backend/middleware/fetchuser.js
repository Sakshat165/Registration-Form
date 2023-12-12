var jwt = require("jsonwebtoken");
const JWT_SECRET = "Sakshatisagoodb$oy";

const fetchuser=(req,res,next)=>{
    //Get the user from jwt token and add id to req obj

    const token=req.header('auth-token');
    if(!token)
    {
        res.status(401).send("Please Authiticate using valid token")
    }
    try{
    const data=jwt.verify(token,JWT_SECRET)
    req.user=data.user;
    next()
    }
    catch(e)
    {
        res.status(401).send("Please Authiticate using valid token")   
    }

}

module.exports=fetchuser;