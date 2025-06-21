import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

interface JWTPayload {
    userId : number
}

export const authenticate = (req:Request,res:Response,next:NextFunction) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({success:false,message:"Token missing"})
    }

    const token = authHeader.split(" ")[1]
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET as string) as JWTPayload
        (req as any).user = {userId: decoded.userId}
        next()
    } catch (error) {
        console.error("JWT verification failed",error)
        res.status(401).json({success:false,message:"Invalid or expired token" })
    }
}