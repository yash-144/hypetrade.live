"use client";

import Link from "next/link";
import { LoginForm } from "./LoginForm";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

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
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      // Only call custom-login if cookie not already set
      if (!document.cookie.includes("session=")) {
        fetch("/api/custom-login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: session.user.id }),
        })
          .then((res) => {
            if (res.ok) {
              router.push("/market");
            }
          });
      } else {
        router.push("/market");
      }
    }
  }, [status, session, router]);

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

            {/* Google Sign-in */}
            <div>
              <p className="text-sm text-gray-500 text-center mt-6">
                OR
              </p>
            </div>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => signIn("google")} // don't set callbackUrl here
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Sign in with Google
              </button>
            </div>

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
