'use client';

import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Button } from '@/app/ui/button';
import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from 'react';



import Link from 'next/link';

interface LoginFormProps {
  className?: string;
  titleSize?: string;
  subtitleSize?: string;
  textSize?: string;
  inputPadding?: string;
  buttonPadding?: string;
}

export default function LoginForm({
  className = '',
  titleSize = 'text-2xl lg:text-xl',
  subtitleSize = 'text-sm lg:text-xs',
  textSize = 'text-sm',
  inputPadding = 'py-2 lg:py-1.5',
  buttonPadding = 'py-2.5 lg:py-2',
}: LoginFormProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { update } = useSession();
  const { data: session, status } = useSession();

  const handleUpdateSession = async () => {
    console.log("session Data:", session);
    await update();
  }

  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard/profile';
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );
  
  const [showPassword, setShowPassword] = useState(false);

  const handleOAuthLogin = (provider: 'google' | 'apple') => {
    console.log(`OAuth login with ${provider}`);
  };

  return (
    <form
      action={formAction}
      className={`w-full space-y-4 lg:space-y-3 ${className}`}
    >
      {/* Header */}
      <header className="text-center space-y-1">
        <h1 className={`${titleSize} font-bold text-gray-900`}>
          Welcome back
        </h1>
        <p className={`${subtitleSize} text-gray-600`}>
          Sign in to explore handcrafted treasures
        </p>
      </header>

      {/* Fields */}
      <div className="w-full space-y-3 lg:space-y-2">
        {/* Email */}
        <div>
          <label
            className={`block mb-1 ${textSize} font-semibold text-gray-900`}
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            type="email"
            placeholder="artisan@example.com"
            className={`w-full rounded-lg border border-gray-300 bg-white px-3 ${inputPadding} ${textSize} text-gray-900 placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition`}
            id="email"
            name='email'
            required
          />
        </div>

        {/* Password */}
        <div>
          <label
            className={`block mb-1 ${textSize} font-semibold text-gray-900`}
            htmlFor='password'
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name='password'
              placeholder="••••••••"
              required
              className={`w-full rounded-lg border border-gray-300 bg-white mb-5 px-3 ${inputPadding} pr-10 ${textSize} text-gray-900 placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition`}
            />
            <button
              type="button"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <EyeSlashIcon className="h-4 w-4" />
              ) : (
                <EyeIcon className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>



        {/* Login button */}
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <button
          type="submit"
          className={`w-full rounded-lg bg-orange-500 ${buttonPadding} ${textSize} font-semibold text-white hover:bg-orange-600 transition `}
          aria-disabled={isPending}

        >
          Sign In
        </button>


        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>

        {/* Divider */}
        <div className="relative my-4 lg:my-3">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-gray-50 px-3 text-gray-500">OR CONNECT WITH</span>
          </div>
        </div>

        {/* OAuth buttons */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            type="button"
            onClick={()=>handleUpdateSession()}
            // onClick={() => handleOAuthLogin('google')}
            className={`${textSize} px-4 ${buttonPadding}`}
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </Button>
        </div>

        {/* Footer link */}
        <div className="text-center pt-2 lg:pt-1">
          <p className={`${textSize} text-gray-700`}>
            Don&apos;t have an account?{' '}
            <Link
              href="/auth/register"
              className="font-semibold text-orange-500 hover:text-orange-600"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
}