import LoginForm from '@/app/ui/login-form';
import Image from 'next/image';
import { Suspense } from 'react';


export default function RegisterPage() {
  return (
    <main className="flex flex-col lg:flex-row min-h-screen overflow-hidden">

      <div className="relative w-full lg:w-3/5 min-h-[300px] lg:h-screen">
        <Image
          src="/login-hero.webp"
          alt="Handcrafted pottery"
          fill
          priority
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute bottom-8 left-8 sm:bottom-12 sm:left-12 z-10 max-w-md text-white pr-8">
          <h1 className="mb-3 text-3xl sm:text-4xl font-bold">
            Handcrafted Haven
          </h1>
          <p className="text-base sm:text-lg text-gray-200">
            Discover the heart and soul behind every handcrafted piece in our marketplace.
          </p>
        </div>
      </div>

      <div className="flex w-full lg:w-2/5 items-center justify-center bg-gray-50 p-6 sm:p-8 lg:p-8 min-h-[300px] lg:h-screen">

        <div className="w-full max-w-md lg:max-w-md">
          <Suspense fallback={<div className="h-64 w-full bg-gray-200 animate-pulse rounded-lg" />}>
          <LoginForm
            titleSize="text-3xl lg:text-2xl"
            subtitleSize="text-base lg:text-sm"
            textSize="text-base"
            inputPadding="py-3 lg:py-2"
            buttonPadding="py-3 lg:py-2.5"
          />
          </Suspense>
        </div>
      </div>


    </main>
  );
}