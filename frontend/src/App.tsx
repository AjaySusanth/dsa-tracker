import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import DashboardLayout from "./components/DashboardLayout"
import Problems from "./pages/Problems"
import Analytics from "./pages/Analytics"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
          }>
          <Route index element={<Dashboard />} />
          <Route path="problems" element={<Problems />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
    </Routes>

  )
}

export default App
