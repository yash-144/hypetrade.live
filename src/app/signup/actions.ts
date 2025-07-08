"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { Resend } from "resend";

const signupSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }).trim(),
  lastName: z.string().min(1, { message: "Last name is required" }).trim(),
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }).trim(),
});

export async function signup(prevState: unknown, formData: FormData) {
  const result = signupSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const { firstName, lastName, email, password } = result.data;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return { errors: { email: ["An account with this email already exists."] } };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationToken = crypto.randomBytes(32).toString("hex");

  await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      verificationToken, // Save the token to the user
    },
  });

  // Send the verification email
  const resend = new Resend(process.env.RESEND_API_KEY);
  const verificationLink = `${process.env.NEXTAUTH_URL}/verify-email?token=${verificationToken}`;

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Verify Your Email for HypeTrade',
      html: `<p>Welcome to HypeTrade! Click the link below to verify your email address:</p><p><a href="${verificationLink}">Verify Email</a></p>`,
    });
  } catch (error) {
    console.error("Failed to send verification email:", error);
    // You might want to handle this error more gracefully
    return { errors: { email: ["Could not send verification email. Please try again later."] } };
  }

  // Instead of logging in, redirect to a page telling them to check their email
  redirect("/check-email"); 
}
