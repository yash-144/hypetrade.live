import Link from "next/link";

export default function CheckEmailPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white text-center px-4">
      <h1 className="text-3xl font-bold">Check Your Inbox</h1>
      <p className="text-gray-300 mt-4 max-w-md">
        We&apos;ve sent a verification link to your email address. Please click the link to complete your registration.
      </p>
      <p className="text-sm text-gray-500 mt-2">(If you don&apos;t see it, check your spam folder!)</p>
      <Link href="/" className="mt-8 text-blue-400 hover:underline">
        Back to Home
      </Link>
    </div>
  );
}
