import { PrismaClient } from "../generated/prisma";
import { comparePassword, hashPassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";

const prisma = new PrismaClient()

export const register = async(email: string, password: string) => {
    const existingUser = await prisma.user.findUnique({
        where:{email}
    })

    if (existingUser) {
        throw new Error("User already registered")
    }

    const hashed = await hashPassword(password)

    const user = await prisma.user.create({
        data:{email, password:hashed}
    })

    const token = generateToken(user.id)

    const {password:_,...userWithoutPassword} = user
    return {user:userWithoutPassword,token}

}

export const login = async(email:string, password: string) => {
    const user = await prisma.user.findUnique({
        where: {email}
    })

    if (!user || !(await comparePassword(password, user.password))) {
        throw new Error("Invalid Credentials")
    }

    const token = generateToken(user.id)
    const {password:_,...userWithoutPassword} = user
    return {user:userWithoutPassword,token}
}