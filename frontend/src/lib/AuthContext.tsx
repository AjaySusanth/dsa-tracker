import { createContext, useEffect, useState, type ReactNode } from "react";
import API from "./Axios";
interface User {
    id: number
    name: string
    email: string
}

interface AuthContextType {
    user: User | null
    isAuthenticated: boolean
    loading: boolean
    register: (name:string,email:string, password:string) => Promise<void>
    login: (email:string, password:string) =>Promise<void>
    logout: ()=> Promise<void>

}
export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider = ({children}:{children:ReactNode}) => {
    const [user,setUser] = useState< User | null>(null)
    const [loading,setLoading] = useState(true)

    const fetchUser = async() => {
        try {
            const res = await API.get('/auth/me')
            setUser(res.data.user)
        } catch (error) {
            setUser(null)
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(()=> {
        fetchUser()
    },[])
    
    const login  = async(email: string, password: string) => {
        await API.post('/auth/login',{email,password})
        await fetchUser()
    }

    const register  = async(name:string, email: string, password: string) => {
        await API.post('/auth/register',{name,email,password})
        await fetchUser()
    }

    const logout = async() => {
        await API.post('/auth/logout')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{user,isAuthenticated: !!user, loading,login,logout,register}}>
            {children}
        </AuthContext.Provider>
    )
}   