'use client';

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signup } from './actions';

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-cyan-500 rounded-lg shadow-sm text-sm font-medium text-cyan-400 bg-transparent hover:bg-cyan-500/90 hover:text-white hover:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 dark:focus:ring-offset-gray-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={pending}
            aria-disabled={pending}
            >
            {pending ? 'Creating Account...' : 'Create Account'}
        </button>
    );
}

export default function SignupForm() {
    const [state, formAction] = useActionState(signup, undefined);

    return (
        <form action={formAction} className="space-y-4">
            <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                <div className="mt-1">
                    <input id="firstName" name="firstName" type="text" autoComplete="given-name" required
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 transition-shadow" />
                </div>
                {state?.errors?.firstName && (
                    <p className="text-sm text-red-500 mt-1">{state.errors.firstName}</p>
                )}
            </div>
            <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                <div className="mt-1">
                    <input id="lastName" name="lastName" type="text" autoComplete="family-name" required
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 transition-shadow" />
                </div>
                 {state?.errors?.lastName && (
                    <p className="text-sm text-red-500 mt-1">{state.errors.lastName}</p>
                )}
            </div>

            {/* Email Field */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email address</label>
                <div className="mt-1">
                    <input id="email" name="email" type="email" autoComplete="email" required
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 transition-shadow" />
                </div>
                 {state?.errors?.email && (
                    <p className="text-sm text-red-500 mt-1">{state.errors.email}</p>
                )}
            </div>

            {/* Password Field */}
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                <div className="mt-1">
                    <input id="password" name="password" type="password" autoComplete="new-password" required
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 transition-shadow" />
                </div>
                 {state?.errors?.password && (
                    <p className="text-sm text-red-500 mt-1">{state.errors.password}</p>
                )}
            </div>

            {/* Signup Button */}
            <div className="pt-2">
                <SubmitButton />
            </div>
        </form>
    );
}
