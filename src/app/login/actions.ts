"use server";

import { z } from "zod";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }).trim(),
});

export async function login(prevState: unknown, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  // 🔍 Look up the user from the DB
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return {
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }

  // 🔐 Compare hashed password
  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return {
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }

  // 🎉 Success: Create session
  await createSession(user.id);
  redirect("/market");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
