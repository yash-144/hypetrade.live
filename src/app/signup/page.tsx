"use client";

import Link from 'next/link';
import SignupForm from './SignupForm';
import { signIn } from "next-auth/react";

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


export default function SignupPage() {
    return (
        <>
            <GlobalStyles />
            <div className="bg-gray-900 bg-pattern transition-colors duration-300">
                <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
                    {/* Signup Card */}
                    <div className="w-full max-w-md bg-white dark:bg-gray-800/50 dark:border-gray-700 border border-gray-200 rounded-2xl shadow-xl p-8 backdrop-blur-sm">

                        {/* Logo */}
                        <div className="text-center mb-8">
                            <Link href="/" className="text-3xl font-extrabold tracking-tight">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
                                    HypeTrade
                                </span>
                                <span className="text-cyan-400">.live</span>
                            </Link>
                            <p className="text-gray-500 dark:text-gray-400 mt-2">Create an account to start trading the hype.</p>
                        </div>

                        {/* Signup Form */}
                        <SignupForm />

                        {/* Sign In with Google */}
                        <div>
                            <p className="text-sm text-gray-500 text-center mt-6">
                                OR
                            </p>
                        </div>
                        <div className="mt-6">
                            <button
                                type="button"
                                onClick={() => signIn('google', { callbackUrl: '/market' })}
                                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                            >

                                {/* Add a Google Icon SVG here */}
                                Sign in with Google
                            </button>
                        </div>

                        {/* Divider */}

                        {/* Login Link */}
                        <div className="mt-8 text-center">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Already have an account?
                                <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500 dark:text-cyan-400 dark:hover:text-cyan-300 transition-all duration-200 inline-block hover:scale-105 transform-origin-left">
                                    &nbsp;Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
