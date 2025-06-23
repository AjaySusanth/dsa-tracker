import { PrismaClient } from "../generated/prisma";

type ProblemFilter =  {
    userId: number
    title?: {contains: string, mode:'insensitive'}
    topic?: {contains: string, mode:'insensitive'}
    difficulty?: {equals: string, mode:'insensitive'}
    needRevision?: boolean
}   

const prisma = new PrismaClient()

export const createProblem = async(data:any,userId: number) => {
    return prisma.problem.create({
        data: {...data,userId}
    })
}

export const getAllProblems = async (userId: number,search?: string, topic?: string, difficulty?: string, revision?: boolean) =>{
    let where:ProblemFilter = {userId}

    if(search) {
        where.title = {contains:search, mode:'insensitive'}
    }

    if (topic) {
        where.topic = {contains:topic, mode:'insensitive'}
    }

    if (difficulty) {
        where.difficulty = {equals:difficulty, mode:'insensitive'}
    }

    if(revision) {
        where.needRevision = revision
    }
    return prisma.problem.findMany({where})
}

export const getProblemById = async (id:number,userId: number) => {
    return prisma.problem.findUnique({
        where:{id,userId}
    })
}

export const updateProblem = async (id:number,data:any,userId: number) => {
    return prisma.problem.update({
        where:{id,userId},
        data
    })
}

export const deleteProblem = async(id:number,userId: number) => {
    return prisma.problem.delete({
        where:{id,userId}
    })
}