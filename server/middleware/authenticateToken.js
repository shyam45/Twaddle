import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv' 
dotenv.config()

export const authenticateToken = (req,res,next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader
    
    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}   