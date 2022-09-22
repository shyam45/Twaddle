import express from 'express'
import {userHelper} from '../helpers/userHelper.js'

const router = express.Router()

router.post('/getotp',(req,res)=>{
    userHelper.getOTP(req.body)
})

router.post('/verifyotp',(req,res)=>{
    userHelper.verifyOTP(req.body).then(()=>{
        res.status(200).json({msg:"otp verified"})
    })
})

router.post('/user',(req,res)=>{
    userHelper.verifyUser(req.body).then(()=>{
        res.status(200).json({msg:"user not exist"})
    }).catch((error)=>{
        res.status(422).json(error)
    })
})

router.post('/usernamevalid',(req,res)=>{
    userHelper.usernameValid(req.body).then(()=>{
        res.status(200).json({msg:"username not exist"})
    }).catch((error)=>{
        res.status(422).json(error)
    })
})

router.post('/signup',(req,res)=>{
    userHelper.doSignup(req.body).then(()=>{
        res.status(200).json({msg:"signedup successfully"})
    })
})

router.post('/login',(req,res)=>{
    userHelper.doLogin(req.body).then(({accessToken,refreshToken})=>{
        res.cookie("jwt",accessToken,refreshToken,{
            httponly: true,
            sameSite:"None",
            secure:true,
            maxAge: 24 * 60 * 60 * 1000
        })
        res.status(200).json({msg:"logined successfully"})
    }).catch(()=>{
        res.status(409).json({msg:"Invalid credentials"})
    })
})

router.post('/forgotpassword',(req,res)=>{
    userHelper.forgotPassword(req.body).then(()=>{
        res.status(200).json({msg:"User Found"})
    }).catch(()=>{
        res.status(409).json({msg:"Invalid credential"})
    })
})

router

export default router