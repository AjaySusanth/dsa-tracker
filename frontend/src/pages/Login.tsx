import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { Loader } from "@/components/ui/loader"


function Login() {
    const [showPassword, setShowPassword] = useState(false)
    const [loading,setLoading] = useState(false)
    const [form,setForm] = useState({email: "", password:""})
    const [error,setError] = useState("")
    const {login} = useAuth()
    const navigate = useNavigate()


    const handleSubmit = async(e: React.FormEvent) => {
      e.preventDefault()
      try {
        setLoading(true)
        setError("")
        await login(form.email,form.password)
        navigate('/dashboard')
      } catch (err: any) {
          setError(err?.response?.data?.message || err.message || "Login failed")
          console.log(err.message)
      } finally {
        setLoading(false)
      }
    }
  return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 blur-3xl"></div>

      <Card className="w-full max-w-md bg-slate-900/50 border-slate-800 backdrop-blur-sm relative z-10">
        <CardHeader className="text-center space-y-4">
          <div>
            <CardTitle className="text-2xl font-bold text-white">Welcome Back</CardTitle>
            <CardDescription className="text-slate-400">Sign in to your DSA Tracker account</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e)=>setForm({...form, email:e.target.value})}
                placeholder="Enter your email"
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 focus:border-purple-500 focus:ring-0 focus:ring-transparent focus:outline-none"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e)=>setForm({...form, password:e.target.value})}
                  placeholder="Enter your password"
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 focus:border-purple-500 focus:ring-0 focus:ring-transparent focus:outline-none pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-slate-400 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  
                </Button>
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-sm mt-2 text-center" aria-live="polite">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0"
              disabled={loading}
            >
              { loading ?  <Loader variant="dots" size="md"/> : "Login" }
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-400">
              Don't have an account?{" "}
              <Link to="/register" className="text-purple-400 hover:text-purple-300 font-medium">
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <Link to="/" className="text-slate-500 hover:text-slate-400 text-sm">
              ← Back to home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
export default Login