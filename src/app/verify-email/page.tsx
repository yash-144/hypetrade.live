import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const token = searchParams.token as string | undefined;

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <h1 className="text-2xl font-bold">Invalid Verification Link</h1>
        <p className="text-gray-400 mt-2">The link is missing a token.</p>
      </div>
    );
  }

  const user = await prisma.user.findUnique({
    where: { verificationToken: token },
  });

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <h1 className="text-2xl font-bold">Invalid Token</h1>
        <p className="text-gray-400 mt-2">This verification link is invalid or has already been used.</p>
        <Link href="/login" className="mt-4 text-blue-400 hover:underline">Go to Login</Link>
      </div>
    );
  }

  // Mark the user as verified and clear the token
  await prisma.user.update({
    where: { id: user.id },
    data: {
      emailVerified: new Date(),
      verificationToken: null, // Important: clear the token
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-2xl font-bold text-green-400">Email Verified!</h1>
      <p className="text-gray-300 mt-2">Your account has been successfully verified.</p>
      <Link href="/login" className="mt-6 bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700">
        Proceed to Login
      </Link>
    </div>
  );
}
