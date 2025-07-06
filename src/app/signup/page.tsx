"use client";

import Link from 'next/link';

// NOTE: In a real Next.js app, you would typically move these styles
// into your `globals.css` file. They are included here for self-containment.
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
            <div className="bg-gray-50 dark:bg-gray-900 bg-pattern transition-colors duration-300">
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
                        <form className="space-y-6">
                            {/* Full Name Field */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                                <div className="mt-1">
                                    <input id="name" name="name" type="text" autoComplete="name" required
                                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 transition-shadow" />
                                </div>
                            </div>

                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email address</label>
                                <div className="mt-1">
                                    <input id="email" name="email" type="email" autoComplete="email" required
                                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 transition-shadow" />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                                <div className="mt-1">
                                    <input id="password" name="password" type="password" autoComplete="new-password" required
                                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 transition-shadow" />
                                </div>
                            </div>

                            {/* Confirm Password Field */}
                            <div>
                                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
                                <div className="mt-1">
                                    <input id="confirm-password" name="confirm-password" type="password" autoComplete="new-password" required
                                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 transition-shadow" />
                                </div>
                            </div>

                            {/* Signup Button */}
                            <div>
                                <button type="submit"
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-all transform hover:scale-105">
                                    Create Account
                                </button>
                            </div>
                        </form>

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
