import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient()

export const createProblem = async(data:any) => {
    return prisma.problem.create({
        data
    })
}

export const getAllProblems = async () =>{
    return prisma.problem.findMany()
}

export const getProblemById = async (id:number) => {
    return prisma.problem.findUnique({
        where:{id}
    })
}

export const updateProblem = async (id:number,data:any) => {
    return prisma.problem.update({
        where:{id},
        data
    })
}

export const deleteProblem = async(id:number) => {
    return prisma.problem.delete({
        where:{id}
    })
}