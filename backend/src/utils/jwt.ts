import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined')
}

const jwtSecret:string = JWT_SECRET

export const generateToken = (userId: number):string =>  {
    const token =  jwt.sign({userId},jwtSecret,{
        expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    })
    return token
}

export const verifyToken = (token: string): any => {
    return jwt.verify(token,jwtSecret)
}