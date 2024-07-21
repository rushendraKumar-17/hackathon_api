const jwt=require('jsonwebtoken')
const JWT_SIGN="rguktrkv"

const fetchfaculty=(req,res,next)=>
{
    // console.log("into middleware")
    const token=req.header('auth-token');
    if(!token)
    {
        res.status(401).send({error:"please validate the token"})
    }
    try
    {
        const data=jwt.verify(token,JWT_SIGN);
        req.faculty=data.faculty;
        next();
    }
    catch(error)
    {
        res.status(401).send({error:"please validate the token"})
    }
}
module.exports=fetchfaculty;