import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import auth from "../firebase/firebase.config";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff, FiMail, FiLock, FiUser, FiShield } from "react-icons/fi";
import toast from "react-hot-toast";
import pawLogo from "../assets/logo.png";

const Login = () => {
  const { setUser, handleGoogleSignin, loginWithEmailPassword } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const fillCredential = (type) => {
    if (type === 'admin') {
      setEmail('admin123@gmail.com');
      setPassword('123456Dd');
    } else if (type === 'user') {
      setEmail('user@gmail.com');
      setPassword('123456Hh');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await loginWithEmailPassword(email, password);
      toast.success("Login successful!");
      navigate(location.state?.from?.pathname || "/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const googleSignin = async () => {
    setLoading(true);
    try {
      await handleGoogleSignin();
      toast.success("Login successful!");
      navigate(location.state?.from?.pathname || "/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Google sign-in failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleForget = () => {
    if (!email) {
      toast.error("Please enter your email first");
      return;
    }
    navigate(`/forget/${email}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1C9B8E] via-[#0F1E64] to-[#1C9B8E]">
      <title>Login - PawMart</title>
      
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white p-4 rounded-2xl shadow-lg">
                <img src={pawLogo} alt="PawMart Logo" className="h-12 w-12" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Welcome Back to <span className="text-[#53DFD1]">PawMart</span>
            </h2>
            <p className="text-gray-200">Sign in to your account to continue</p>
          </div>

          {/* Login Form */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
            <form id="login-fieldset" onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  <FiMail className="inline mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#53DFD1] focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  <FiLock className="inline mr-2" />
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#53DFD1] focus:border-transparent transition-all duration-200 pr-12"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              {/* Test Credentials */}
              <div className="space-y-3">
                <p className="text-sm text-gray-300 text-center">Quick Login for Testing:</p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => fillCredential('admin')}
                    className="flex-1 bg-red-500/20 hover:bg-red-500/30 border border-red-400/50 text-red-200 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <FiShield className="w-4 h-4" />
                    Admin Login
                  </button>
                  <button
                    type="button"
                    onClick={() => fillCredential('user')}
                    className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/50 text-blue-200 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <FiUser className="w-4 h-4" />
                    User Login
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <button 
                  type="button"
                  onClick={handleForget} 
                  className="text-[#53DFD1] hover:text-white text-sm font-medium transition-colors duration-200"
                >
                  Forgot password?
                </button>
              </div>

              {/* Login Button */}
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#53DFD1] to-[#1C9B8E] hover:from-[#1C9B8E] hover:to-[#53DFD1] text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing In...
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-white/30"></div>
              <span className="px-4 text-gray-300 text-sm">OR</span>
              <div className="flex-1 border-t border-white/30"></div>
            </div>

            {/* Google Sign In */}
            <button 
              onClick={googleSignin} 
              disabled={loading}
              className="w-full bg-white hover:bg-gray-50 text-gray-800 font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FcGoogle className="text-xl" />
              Continue with Google
            </button>

            {/* Sign Up Link */}
            <div className="text-center mt-6">
              <span className="text-gray-300">Don't have an account? </span>
              <Link to="/signup" className="text-[#53DFD1] hover:text-white font-medium transition-colors duration-200">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
