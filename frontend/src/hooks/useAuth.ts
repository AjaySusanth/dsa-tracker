import { AuthContext } from "@/lib/AuthContext"
import { useContext } from "react"

export const useAuth = () => {
    return useContext(AuthContext)
}

