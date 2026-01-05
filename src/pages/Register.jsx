import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff, FiMail, FiLock, FiUser, FiImage, FiCheck, FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import pawLogo from "../assets/logo.png";

const Register = () => {
  const { registerWithEmailPassword, setUser, handleGoogleSignin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoUrl: '',
    password: ''
  });

  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Password validation
    if (name === 'password') {
      setPasswordValidation({
        length: value.length >= 6,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value)
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { name, email, photoUrl, password } = formData;

    // Validation
    if (!passwordValidation.length) {
      toast.error("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }
    if (!passwordValidation.uppercase) {
      toast.error("Password must contain at least one uppercase letter");
      setLoading(false);
      return;
    }
    if (!passwordValidation.lowercase) {
      toast.error("Password must contain at least one lowercase letter");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await registerWithEmailPassword(email, password);
      
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoUrl,
      });

      setUser(userCredential.user);
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const googleSignup = async () => {
    setLoading(true);
    try {
      await handleGoogleSignin();
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Google sign-up failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1C9B8E] via-[#0F1E64] to-[#1C9B8E]">
      <title>Register - PawMart</title>
      
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
              Join <span className="text-[#53DFD1]">PawMart</span> Community
            </h2>
            <p className="text-gray-200">Create your account to get started</p>
          </div>

          {/* Register Form */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  <FiUser className="inline mr-2" />
                  Full Name
                </label>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#53DFD1] focus:border-transparent transition-all duration-200"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  <FiMail className="inline mr-2" />
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#53DFD1] focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Photo URL Field */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  <FiImage className="inline mr-2" />
                  Photo URL (Optional)
                </label>
                <input
                  name="photoUrl"
                  type="url"
                  value={formData.photoUrl}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#53DFD1] focus:border-transparent transition-all duration-200"
                  placeholder="Enter your photo URL"
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
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#53DFD1] focus:border-transparent transition-all duration-200 pr-12"
                    placeholder="Create a password"
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

                {/* Password Requirements */}
                {formData.password && (
                  <div className="mt-3 space-y-2">
                    <div className={`flex items-center text-sm ${passwordValidation.length ? 'text-green-400' : 'text-red-400'}`}>
                      {passwordValidation.length ? <FiCheck className="mr-2" /> : <FiX className="mr-2" />}
                      At least 6 characters
                    </div>
                    <div className={`flex items-center text-sm ${passwordValidation.uppercase ? 'text-green-400' : 'text-red-400'}`}>
                      {passwordValidation.uppercase ? <FiCheck className="mr-2" /> : <FiX className="mr-2" />}
                      One uppercase letter
                    </div>
                    <div className={`flex items-center text-sm ${passwordValidation.lowercase ? 'text-green-400' : 'text-red-400'}`}>
                      {passwordValidation.lowercase ? <FiCheck className="mr-2" /> : <FiX className="mr-2" />}
                      One lowercase letter
                    </div>
                  </div>
                )}
              </div>

              {/* Register Button */}
              <button 
                type="submit"
                disabled={loading || !passwordValidation.length || !passwordValidation.uppercase || !passwordValidation.lowercase}
                className="w-full bg-gradient-to-r from-[#53DFD1] to-[#1C9B8E] hover:from-[#1C9B8E] hover:to-[#53DFD1] text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-white/30"></div>
              <span className="px-4 text-gray-300 text-sm">OR</span>
              <div className="flex-1 border-t border-white/30"></div>
            </div>

            {/* Google Sign Up */}
            <button 
              onClick={googleSignup} 
              disabled={loading}
              className="w-full bg-white hover:bg-gray-50 text-gray-800 font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FcGoogle className="text-xl" />
              Continue with Google
            </button>

            {/* Sign In Link */}
            <div className="text-center mt-6">
              <span className="text-gray-300">Already have an account? </span>
              <Link to="/login" className="text-[#53DFD1] hover:text-white font-medium transition-colors duration-200">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
