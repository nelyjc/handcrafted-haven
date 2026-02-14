'use server';
 
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { redirect } from "next/navigation";


 
import bcrypt from "bcryptjs";
import { createSeller, getSellerByEmail } from "./sellers";

export async function registerSeller(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!name || !email || !password || !confirmPassword) {
      return "All fields are required.";
    }

    if (password.length < 6) {
      return "Password must be at least 6 characters.";
    }

    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }

    const existingUser = await getSellerByEmail(email);
    if (existingUser) {
      return "Email already registered.";
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const [firstName, ...rest] = name.split(" ");
    const lastName = rest.join(" ") || "";

    await createSeller({
      firstName,
      lastName,
      username: email.split("@")[0],
      email,
      passwordHash,
      story: "",
      image: "",
    });

    return "success";
  } catch (error) {
    console.error(error);
    return "Something went wrong.";
  }
}
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    
    await signIn('credentials', formData);
    return 'undefined';
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
