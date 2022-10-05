import * as dotenv from 'dotenv' 
dotenv.config()
import bcrypt from 'bcrypt'
import Twilio  from "twilio"
import {userModel} from '../models/userModel.js'
import { response } from 'express'
import jwt from 'jsonwebtoken'
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
let client = new Twilio(accountSid,authToken)

export  const authHelper = {

    getOTP : (data) => {
        return new Promise((resolve,reject)=>{
            try {
                client.verify.services(process.env.TWILIO_SERVICE_ID)
                .verifications
                .create({to: `+91${data.phone}`, channel: 'sms'})
                .then(verification => resolve(verification.status))
            } catch (error) {
                console.log(error)
            }
        })
    },

    verifyOTP : (data) =>{
        return new Promise((resolve,reject)=>{
            client.verify.v2.services(process.env.TWILIO_SERVICE_ID)
            .verificationChecks
            .create({to: `+91${data.phone}`, code: data.otp})
            .then((verification_check) => {
                if (verification_check.status === 'approved') {
                    resolve('success')
                } else {
                    reject()
                }
            })
        })
    },

    verifyUser: (data)=>{
        return new Promise(async(resolve, reject) => {
            let userExist = await userModel.findOne({
                $or : [
                    {email : data.email},
                    {phone : data.phone}
                ]
            })
            if(userExist){
                reject({msg : "User already exist"})
            }else{
                resolve(response)
            }
        })
    },

    usernameValid: (data)=>{
        return new Promise(async(resolve, reject) => {
            let usernameExist = await userModel.findOne({username:data.username})
            if(usernameExist){
                reject({msg : "Username already taken"})
            }else{
                resolve()
            }
        })
    },

    doSignup: (data) => {
        return new Promise(async(resolve, reject) => {
            let user =await new userModel(data)
            user.password = await bcrypt.hash(user.password,10)
            try {
                await user.save()
                resolve(user)
            } catch (err) {
                reject(err.message)
            }
        })
    },
    
    doLogin:(data) => {
        return new Promise((resolve, reject) => {
            userModel.findOne({email:data.email}).then(async(user) => {
                if (user) {
                    let status = await bcrypt.compare(data.password,user.password)
                    if (status){
                        var accessToken = jwt.sign({ email: user.email, username : user.name },process.env.ACCESS_TOKEN_SECRET,{expiresIn:"10m"});
                        var refreshToken = jwt.sign({ email: user.email, username : user.name },process.env.REFRESH_TOKEN_SECRET,{expiresIn:"1d"});
                        resolve({accessToken,refreshToken})
                    }
                    else {
                        reject({loginError:"invalid credentials"})
                    }
                }else{
                    reject({loginError:"invalid credentials"})
                }
            });
        })
    },

    forgotPassword : (data) => {
        return new Promise(async(resolve, reject) => {
            let userExist = await userModel.findOne({email : data.email})
            if(userExist){
                resolve({msg : "User found"})
            }else{
                reject({msg : "User not found"})
            }
        })
    
    }
}