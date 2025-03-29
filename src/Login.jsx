import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  AlertCircle,
  Loader2,
  Users,
  Hexagon,
  Sparkles,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/users");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950">
      {/* Navbar */}
      <nav className="bg-slate-900/50 backdrop-blur-lg border-b border-slate-800 px-4 py-3 sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Hexagon className="h-6 w-6 text-violet-500 fill-violet-950" />
            <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-indigo-500 text-transparent bg-clip-text">
              UserHive
            </span>
          </div>
          <div className="hidden sm:flex items-center space-x-6">
            <a
              href="/features"
              className="text-slate-400 hover:text-white text-sm font-medium transition"
            >
              Features
            </a>
            <a
              href="/pricing"
              className="text-slate-400 hover:text-white text-sm font-medium transition"
            >
              Pricing
            </a>
            <a
              href="/docs"
              className="text-slate-400 hover:text-white text-sm font-medium transition"
            >
              Documentation
            </a>
            <a
              href="/signup"
              className="text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 px-4 py-2 rounded-lg text-sm font-medium transition-all"
            >
              Sign up
            </a>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="flex flex-1 w-full container mx-auto">
        {/* Left side with illustration */}
        <div className="hidden lg:flex lg:w-1/2 lg:flex-col lg:items-center lg:justify-center p-8">
          <div className="flex flex-col items-center max-w-md text-center">
            <div className="relative mb-8">
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 opacity-75 blur"></div>
              <div className="relative w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center">
                <Hexagon className="h-12 w-12 text-violet-500 fill-violet-950" />
              </div>
            </div>

            <h2 className="text-4xl font-bold text-white mb-2">
              User Analytics,{" "}
              <span className="bg-gradient-to-r from-violet-400 to-indigo-500 text-transparent bg-clip-text">
                Simplified
              </span>
            </h2>
            <p className="mt-4 text-slate-400 text-lg">
              Track engagement, understand behaviors, and boost retention with
              powerful analytics at your fingertips.
            </p>

            <div className="mt-12 grid grid-cols-3 gap-4 w-full">
              <div className="bg-slate-800/50 backdrop-blur p-4 rounded-xl border border-slate-700">
                <div className="flex justify-center mb-2">
                  <Users className="h-6 w-6 text-violet-400" />
                </div>
                <div className="text-sm text-slate-300 font-medium">
                  User Tracking
                </div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur p-4 rounded-xl border border-slate-700">
                <div className="flex justify-center mb-2">
                  <Sparkles className="h-6 w-6 text-indigo-400" />
                </div>
                <div className="text-sm text-slate-300 font-medium">
                  AI Insights
                </div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur p-4 rounded-xl border border-slate-700">
                <div className="flex justify-center mb-2">
                  <Lock className="h-6 w-6 text-violet-400" />
                </div>
                <div className="text-sm text-slate-300 font-medium">
                  Enterprise SSO
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side with login form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8">
          <Card className="w-full max-w-md border-0 bg-slate-900/50 backdrop-blur-md border border-slate-800 shadow-xl">
            <CardHeader className="space-y-1">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 opacity-75 blur"></div>
                  <div className="relative w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center">
                    <Lock className="h-5 w-5 text-violet-400" />
                  </div>
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-center text-white">
                Welcome back
              </CardTitle>
              <CardDescription className="text-center text-slate-400">
                Log in to access your UserHive dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid gap-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-slate-300"
                  >
                    Email address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500"
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="flex justify-between items-center">
                    <Label
                      htmlFor="password"
                      className="text-sm font-medium text-slate-300"
                    >
                      Password
                    </Label>
                    <a
                      href="/forgot-password"
                      className="text-xs text-violet-400 hover:text-violet-300"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-white"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {error && (
                  <Alert
                    variant="destructive"
                    className="bg-red-900/50 border-red-800 text-red-200"
                  >
                    <AlertCircle className="h-4 w-4 text-red-400" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="flex items-center space-x-2 my-1">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-violet-500 focus:ring-violet-500"
                  />
                  <Label htmlFor="remember" className="text-sm text-slate-400">
                    Remember me for 30 days
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white py-2 rounded-lg transition-all"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign in to dashboard"
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-800"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-slate-900 text-slate-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 w-full">
                <Button
                  variant="outline"
                  className="w-full bg-slate-800/50 border-slate-700 text-white hover:bg-slate-700"
                >
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                      <path
                        fill="#4285F4"
                        d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                      />
                      <path
                        fill="#34A853"
                        d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                      />
                      <path
                        fill="#EA4335"
                        d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                      />
                    </g>
                  </svg>
                  Google
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-slate-800/50 border-slate-700 text-white hover:bg-slate-700"
                >
                  <svg
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                  GitHub
                </Button>
              </div>

              <div className="w-full text-center text-sm text-slate-400">
                Don't have an account?{" "}
                <a
                  href="/signup"
                  className="font-medium text-violet-400 hover:text-violet-300"
                >
                  Create a free account
                </a>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Login;
