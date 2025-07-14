import jwt,{Secret,SignOptions} from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined')
}

const jwtSecret:Secret = JWT_SECRET

export const generateToken = (userId: number):string =>  {
    const expiresInValue = process.env.JWT_EXPIRES_IN || '7d';

    const signInOptions:SignOptions = {
        expiresIn:  expiresInValue as SignOptions['expiresIn'] // This correctly accepts '7d' or a number
    }
    const token = jwt.sign(
        { userId }, // Payload
        jwtSecret,  // SecretOrPrivateKey, now correctly typed as Secret
        signInOptions // Options, now correctly typed as SignOptions
    )
    return token
}

export const verifyToken = (token: string): any => {
    return jwt.verify(token,jwtSecret)
}