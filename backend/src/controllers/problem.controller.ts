import { Request,Response } from "express";

import * as ProblemService from '../services/problem.service'

export const createProblem = async(req:Request,res:Response): Promise<void> => {
    try {
        const userId = (req as any).user.userId
        const problem = await ProblemService.createProblem(req.body,userId)
        res.status(201).json({success:true,problem,message:"Problem created successfully"})
    } catch (err: unknown) {
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


export const getAllProblems = async(req:Request,res:Response) => {
    try {
        const userId = (req as any).user.userId
        const {search,difficulty,topic,revision} = req.query
        const problems = await ProblemService.getAllProblems(
            userId,
            search as string | undefined,
            topic as string | undefined,
            difficulty as string | undefined, 
            revision  === 'true' ? true : revision === 'false' ? false : undefined
        )
        if (problems.length === 0) {
            res.status(200).json({success:true,message:"No problems found",problems:[]})
            return;
        }
        res.status(200).json({success:true,problems,message:"Problem retrieved successfully"})
    } catch (err: unknown) {
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

export const getProblemById = async(req:Request,res:Response) => {
    try {
        const userId = (req as any).user.userId
        const problem = await ProblemService.getProblemById(Number(req.params.id),userId)
        if (!problem) {
            res.status(404).json({success:false,message:"Problem not found"})
            return;
        }
        res.status(200).json({success:true,data:problem,message:"Problem retrieved successfully"})
    } catch (err: unknown) {
        if (err instanceof Error){
            console.error(err.message)
            res.status(400).json({success:false,error:err.message})
        }
        else{
            console.log("Unknown error")
             res.status(500).json({success:false,error:"Unexpected server error"})
        }
    }
}


export const updateProblem = async(req:Request,res:Response) => {
    try {
        const userId = (req as any).user.userId
        const problem = await ProblemService.updateProblem(Number(req.params.id),req.body,userId)
        if (!problem) {
            res.status(404).json({success:false,message:"Problem not found"})
            return;
        }
        res.status(200).json({success:true,data:problem,message:"Problem updated successfully"})
    } catch (err: unknown) {
        if (err instanceof Error){
            console.error(err.message)
            res.status(400).json({success:false,error:err.message})
        }
        else{
            console.log("Unknown error")
             res.status(500).json({success:false,error:"Unexpected server error"})
        }
    }
}

export const deleteProblem = async(req:Request,res:Response) => {
    try {
        const userId = (req as any).user.userId
        const problem = await ProblemService.deleteProblem(Number(req.params.id),userId)
        if (!problem) {
            res.status(404).json({success:false,message:"Problem not found"})
            return; 
        }
        res.status(200).json({success:true,message:"Problem deleted successfully"})
    } catch (err: unknown) {
        if (err instanceof Error){
            console.error(err.message)
            res.status(400).json({success:false,error:err.message})

        }
        else{
            console.log("Unknown error")
             res.status(500).json({success:false,error:"Unexpected server error"})
        }
    }
}
