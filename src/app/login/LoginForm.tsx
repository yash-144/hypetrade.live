"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "./actions"

export function LoginForm() {
    const [state, loginAction] = useActionState(login, undefined);

    return (
        <form action={loginAction} className="space-y-6">
            {/* Email Field */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Email address
                </label>
                <div className="mt-1">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-shadow"
                    />
                </div>
                {state?.errors?.email && (
                    <p className="text-red-500">{state.errors.email}</p>
                )}
            </div>

            {/* Password Field */}
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                </label>
                <div className="mt-1">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-shadow"
                    />
                </div>
                {state?.errors?.email && (
                    <p className="text-red-500">{state.errors.email}</p>
                )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-cyan-500 focus:ring-cyan-600 border-gray-600 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                        Remember me
                    </label>
                </div>

                <div className="text-sm">
                    <Link href="#" className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors">
                        Forgot your password?
                    </Link>
                </div>
            </div>

            {/* Login Button */}
                <SubmitButton />
        </form>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-cyan-500 rounded-lg shadow-sm text-sm font-medium text-cyan-400 bg-transparent hover:bg-cyan-500/90 hover:text-white hover:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 dark:focus:ring-offset-gray-800 transition-all"
            disabled={pending}>
            Sign in
        </button>
    );
}
