import * as AnalyticsService from '../services/analytics.service'
import { Request,Response } from 'express'

export const getSummary = async(req:Request, res:Response) => {
    try {
        const userId = (req as any).user.userId
        const summary = await AnalyticsService.getSummary(userId)
        res.status(200).json({success:true, summary, message:"Summary fetched successfully"})
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

export const getTopicWiseCount = async(req:Request, res:Response) => {
    try {
        const userId = (req as any).user.userId
        const result = await AnalyticsService.topicWiseCount(userId)
        res.status(200).json({success:true, result})
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


export const getDailyStats = async(req:Request, res:Response) => {
    try {
        const userId = (req as any).user.userId
        const result = await AnalyticsService.getDailyStats(userId)
        res.status(200).json({success:true, data:result})
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


export const getContributions = async (req:Request,res:Response) => {
     try {
        const userId = (req as any).user.userId
        const contributions = await AnalyticsService.getContributions(userId)
        res.status(200).json({success:true, contributions})
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
