import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, BarChart3, Target, TrendingUp, Zap, CheckCircle } from "lucide-react"
import { Link } from "react-router-dom"

function Home() {
  return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="border-b border-slate-800/50 sticky top-0 z-50 bg-transparent backdrop-blur-lg ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <span className="hidden sm:block text-xl font-bold text-white">DSA Tracker</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost" className="text-slate-300 hover:text-white hover:border-white border-1 border-slate-300">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0">
                  Register
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 blur-3xl"></div>  
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <Badge className="mb-6 bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700">
              <Zap className="w-4 h-4 mr-2" />
              Track Your Coding Journey
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Master DSA with
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent block">
                Smart Tracking
              </span>
            </h1>
            <p className="text-xl text-slate-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your problem-solving journey with intelligent analytics, personalized insights, and
              comprehensive progress tracking across all DSA topics and difficulty levels.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0 px-8 py-3 text-lg"
                >
                  Get started Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white px-8 py-3 text-lg"
              >
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Everything You Need to Excel</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Comprehensive tools and insights to accelerate your DSA mastery
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-slate-900/50 border-slate-800 hover:border-purple-500/50 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Daily Progress Tracking</h3>
                <p className="text-slate-400 leading-relaxed">
                  Monitor your daily problem-solving activity with detailed statistics, streak tracking, and progress
                  visualization.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800 hover:border-cyan-500/50 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Topic-wise Analytics</h3>
                <p className="text-slate-400 leading-relaxed">
                  Get detailed breakdowns of your performance across different DSA topics with interactive charts and
                  insights.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800 hover:border-emerald-500/50 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Personalized Insights</h3>
                <p className="text-slate-400 leading-relaxed">
                  Receive AI-powered recommendations and insights to optimize your learning path and identify areas for
                  improvement.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">10K+</div>
              <div className="text-slate-400">Problems Tracked</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-slate-400">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">95%</div>
              <div className="text-slate-400">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-slate-400">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-900/20 to-cyan-900/20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your DSA Journey?</h2>
          <p className="text-xl text-slate-400 mb-8">
            Join thousands of developers who are already tracking their progress and achieving their goals.
          </p>
          <Link to="/auth/register">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0 px-8 py-3 text-lg"
            >
              Get Started for Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">DSA Tracker</span>
            </div>
            <div className="text-slate-400">© 2024 DSA Tracker. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
export default Home