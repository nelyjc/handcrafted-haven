'use client';

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { Button } from '@/app/ui/button';
import Link from 'next/link';
import { useActionState } from "react";
import { registerSeller } from "@/app/lib/actions";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface RegisterFormProps {
  className?: string;
}

export default function RegisterForm({ className = '' }: RegisterFormProps) {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  
  const [credentials, setCredentials] = useState<{
    email: string;
    password: string;
  } | null>(null);

  const [state, formAction, isPending] = useActionState(
  registerSeller,
  undefined
);

  useEffect(() => {
  if (state?.success && credentials) {
    const autoLogin = async () => {
      const result = await signIn("credentials", {
        email: credentials.email,
        password: credentials.password,
        redirect: false,
      });

      if (result?.ok) {
        router.push("/dashboard/profile");
      }
    };

    autoLogin();
  }
}, [state, credentials, router]);

 
  if (state?.success === true) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600 text-sm">
          Creating your account...
        </p>
      </div>
    );
  }

  return (
    <form
      action={async (formData) => {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        setCredentials({ email, password });
        await formAction(formData);
      }}
      className={`w-full space-y-4 ${className}`}
    >
      <header className="text-center space-y-1">
        <h1 className="text-2xl font-bold text-gray-900">
          Create an account
        </h1>
        <p className="text-sm text-gray-600">
          Sign up to explore handcrafted treasures
        </p>
      </header>

      {/* NAME */}
      <div>
        <label className="block mb-1 text-sm font-semibold text-gray-900">
          Full Name
        </label>
        <input
          type="text"
          name="name"
          required
          className="w-full text-gray-900 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
        />
      </div>

      {/* EMAIL */}
      <div>
        <label className="block mb-1 text-sm font-semibold text-gray-900">
          Email
        </label>
        <input
          type="email"
          name="email"
          required
          className="w-full text-gray-900 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
        />
      </div>

      {/* USERNAME */}
      <div>
        <label className="block mb-1 text-sm font-semibold text-gray-900">
          Username
        </label>
        <input
          type="text"
          name="username"
          required
          className="w-full text-gray-900 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
        />
      </div>

      {/* PASSWORD */}
      <div>
        <label className="block mb-1 text-sm font-semibold text-gray-900">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            required
            className="w-full  text-gray-900 rounded-lg border border-gray-300 px-3 py-2 pr-10 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? (
              <EyeSlashIcon className="h-4 w-4" />
            ) : (
              <EyeIcon className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* CONFIRM PASSWORD */}
      <div>
        <label className="block mb-1 text-sm font-semibold text-gray-900">
          Confirm Password
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            required
            className="w-full  text-gray-900 rounded-lg border border-gray-300 px-3 py-2 pr-10 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showConfirmPassword ? (
              <EyeSlashIcon className="h-4 w-4" />
            ) : (
              <EyeIcon className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {state?.success === false && state?.message && (
  <p className="text-red-500 text-sm">
    {state.message}
  </p>
)}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-orange-500 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 transition disabled:opacity-50"
      >
        {isPending ? "Creating..." : "Create Account"}
      </button>

      <div className="text-center pt-2">
        <p className="text-sm text-gray-700">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-semibold text-orange-500 hover:text-orange-600"
          >
            Sign In
          </Link>
        </p>
      </div>
    </form>
  );
}
