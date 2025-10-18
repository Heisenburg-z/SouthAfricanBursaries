// AuthPage.jsx
import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { GraduationCap } from 'lucide-react';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
          Student Opportunities Portal 
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {isLogin ? (
            <LoginForm />
          ) : (
            <RegisterForm />
          )}
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                </span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="font-medium text-emerald-600 hover:text-emerald-500"
              >
                {isLogin ? 'Create a new account' : 'Sign in to your account'}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-slate-500">
            By signing up, you agree to our{' '}
            <a href="#" className="text-emerald-600 hover:text-emerald-500">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-emerald-600 hover:text-emerald-500">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;