import { useAuth } from "@/hooks/useAuth"
import { PageLoader } from "./ui/loader"
import { Navigate } from "react-router-dom"
import type { ReactNode } from "react"


const ProtectedRoute = ({children}:{children:ReactNode}) => {
    const {isAuthenticated,loading} = useAuth()

    if (loading) return <PageLoader text="Loading your dashboard"/>

    return isAuthenticated ? children : <Navigate to='/'/>
}
export default ProtectedRoute