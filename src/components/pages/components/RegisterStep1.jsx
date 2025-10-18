// components/RegisterStep1.jsx
import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

const RegisterStep1 = ({ formData, errors, handleInputChange, handleNextStep, handleGoogleAuth }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900">Create Account</h2>
        <p className="text-slate-600 mt-2">Step 1 of 3: Personal Information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-1">
            First Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-slate-400" />
            </div>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleInputChange}
              className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:outline-none ${
                errors.firstName ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-emerald-500 focus:border-emerald-500'
              }`}
              placeholder="First name"
            />
          </div>
          {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-1">
            Last Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-slate-400" />
            </div>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleInputChange}
              className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:outline-none ${
                errors.lastName ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-emerald-500 focus:border-emerald-500'
              }`}
              placeholder="Last name"
            />
          </div>
          {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-slate-400" />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:outline-none ${
              errors.email ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-emerald-500 focus:border-emerald-500'
            }`}
            placeholder="Enter your email"
          />
        </div>
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-slate-400" />
          </div>
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleInputChange}
            className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:outline-none ${
              errors.password ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-emerald-500 focus:border-emerald-500'
            }`}
            placeholder="Create a password"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-slate-400" />
            ) : (
              <Eye className="h-5 w-5 text-slate-400" />
            )}
          </button>
        </div>
        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
        <p className="mt-1 text-xs text-slate-500">Must be at least 6 characters</p>
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-1">
          Confirm Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-slate-400" />
          </div>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:outline-none ${
              errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-emerald-500 focus:border-emerald-500'
            }`}
            placeholder="Confirm your password"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-slate-400" />
            ) : (
              <Eye className="h-5 w-5 text-slate-400" />
            )}
          </button>
        </div>
        {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
      </div>

      <button
        type="button"
        onClick={handleNextStep}
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
      >
        Continue
      </button>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-slate-500">Or continue with</span>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={handleGoogleAuth}
            className="w-full inline-flex justify-center items-center py-3 px-4 border border-slate-300 rounded-lg shadow-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all duration-300"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    </>
  );
};

export default RegisterStep1;