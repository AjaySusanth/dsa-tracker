import { Request,Response } from "express";

import * as ProblemService from '../services/problem.service'

export const createProblem = async(req:Request,res:Response): Promise<void> => {
    try {
        const problem = await ProblemService.createProblem(req.body)
        res.status(201).json({success:true,data:problem,message:"Problem created successfully"})
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
        const problems = await ProblemService.getAllProblems()
        if (problems.length === 0) {
            res.status(200).json({success:true,message:"No problems have been added yet",data:[]})
            return;
        }
        res.status(200).json({success:true,data:problems,message:"Problem retrieved successfully"})
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
        const problem = await ProblemService.getProblemById(Number(req.params.id))
        if (!problem) {
            res.status(404).json({success:false,message:"Problem not found"})
            return;
        }
        res.status(200).json({success:true,data:problem,message:"Problem retrieved successfully"})
    } catch (err: unknown) {
        if (err instanceof Error){
            console.error(err.message)
            res.status(400).json({error:err.message})
        }
        else{
            console.log("Unknown error")
             res.status(500).json({error:"Unexpected server error"})
        }
    }
}


export const updateProblem = async(req:Request,res:Response) => {
    try {
        const problem = await ProblemService.updateProblem(Number(req.params.id),req.body)
        if (!problem) {
            res.status(404).json({success:false,message:"Problem not found"})
            return;
        }
        res.status(200).json({success:true,data:problem,message:"Problem updated successfully"})
    } catch (err: unknown) {
        if (err instanceof Error){
            console.error(err.message)
            res.status(400).json({error:err.message})
        }
        else{
            console.log("Unknown error")
             res.status(500).json({error:"Unexpected server error"})
        }
    }
}

export const deleteProblem = async(req:Request,res:Response) => {
    try {
        const problem = await ProblemService.deleteProblem(Number(req.params.id))
        if (!problem) {
            res.status(404).json({success:false,message:"Problem not found"})
            return; 
        }
        res.status(200).json({success:true,message:"Problem deleted successfully"})
    } catch (err: unknown) {
        if (err instanceof Error){
            console.error(err.message)
            res.status(400).json({error:err.message})

        }
        else{
            console.log("Unknown error")
             res.status(500).json({error:"Unexpected server error"})
        }
    }
}
