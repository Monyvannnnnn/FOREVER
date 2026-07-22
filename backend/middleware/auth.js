import jwt from 'jsonwebtoken'

const authUser = async (req,res, next) => {
    const { token } = req.headers; 
    if (!token)  {
        return res.json({success:false, message: "Not authorized login again"})
    }
    try{
        const jwtSecret = (process.env.JWT_SECRET || 'greatstack').replace(/^['"]|['"]$/g, '').trim();
        const token_decode = jwt.verify(token, jwtSecret);
        req.body.userId = token_decode.id
        next();
    }catch(error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
}
export default authUser