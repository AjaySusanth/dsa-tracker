import { Request,Response } from "express"
import * as AuthService from '../services/auth.service'


export const register = async(req: Request,res:Response) => {
    const {email,password} = req.body
    try {

        const {user,token} = await AuthService.register(email,password)
        res.status(201).json({success:true, user:{id: user.id, email: user.email},token})
 
    } catch (err:unknown) {

        if (err instanceof Error){
            console.error(err.message)
            res.status(400).json({success:false,message:err.message})
        }
        else{
            console.log("Unknown error")
            res.status(500).json({success:false,message:"Unexpected server error"})
        }
    }

}

export const login = async(req: Request,res:Response) => {
    const {email,password} = req.body
    try {

        const {user,token} = await AuthService.login(email,password)
        res.status(200).json({success:true, user:{id: user.id, email: user.email},token})
 
    } catch (err:unknown) {

        if (err instanceof Error){
            console.error(err.message)
            res.status(400).json({success:false,message:err.message})
        }
        else{
            console.log("Unknown error")
            res.status(500).json({success:false,message:"Unexpected server error"})
        }
    }

}
