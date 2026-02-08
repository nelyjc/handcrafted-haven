import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'outline';
}

export function Button({ 
  children, 
  className, 
  variant = 'primary',
  disabled,
  ...rest 
}: ButtonProps) {
  return (
    <button
      {...rest}
      disabled={disabled}
      className={clsx(
        'flex h-12 w-full items-center justify-center rounded-lg px-4 text-base font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        {
          'bg-orange-500 text-white hover:bg-orange-600 focus-visible:outline-orange-500 active:bg-orange-700': variant === 'primary',
          'border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus-visible:outline-gray-400': variant === 'outline',
        },
        className,
      )}
    >
      {children}
    </button>
  );
}