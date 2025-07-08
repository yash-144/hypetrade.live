"use server";

import { z } from "zod";
import { createSession } from "@/lib/session";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z.string().min(1, { message: "Password is required" }).trim(),
});

export async function login(prevState: unknown, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const { email, password } = result.data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.password) { // Check if user exists and has a password (i.e., not a Google-only user)
    return { errors: { email: ["Invalid email or password"] } };
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return { errors: { email: ["Invalid email or password"] } };
  }

  await createSession(user.id);
  redirect("/market");
}
