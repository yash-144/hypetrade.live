"use client";

import Link from "next/link";
import { LoginForm } from "./LoginForm";

const GlobalStyles = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    body {
        font-family: 'Inter', sans-serif;
    }
    .bg-pattern {
        background-image: radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0);
        background-size: 20px 20px;
    }
    .dark .bg-pattern {
        background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0);
    }
  `}</style>
);

export default function LoginPage() {
  return (
    <>
      <GlobalStyles />
      <div className="bg-gray-50 dark:bg-gray-900 bg-pattern transition-colors duration-300">
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
          <div className="w-full max-w-md bg-white dark:bg-gray-800/50 dark:border-gray-700 border border-gray-200 rounded-2xl shadow-xl p-8 backdrop-blur-sm">

            {/* Logo */}
            <div className="text-center mb-8">
              <Link href="/" className="text-3xl font-extrabold tracking-tight">
                <span className="bg-clip-text text-light">HypeTrade</span>
                <span className="text-cyan-400">.live</span>
              </Link>
              <p className="text-muted mt-2">Welcome back! Please sign in to continue.</p>
            </div>

            {/* Login Form */}
            <LoginForm />

            {/* Sign Up Link */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-400">
                Don&apos;t have an account?
                <Link href="signup" className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors">
                  &nbsp;Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
