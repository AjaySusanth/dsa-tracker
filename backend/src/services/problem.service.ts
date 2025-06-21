import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient()

export const createProblem = async(data:any,userId: number) => {
    return prisma.problem.create({
        data: {...data,userId}
    })
}

export const getAllProblems = async (userId: number) =>{
    return prisma.problem.findMany({
        where: {userId}
    })
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