import React, { forwardRef } from 'react';

/**
 * Text input component with sensible defaults. Accepts any native
 * input attributes via props. Uses Tailwind classes to provide a
 * consistent dark mode friendly appearance. Forwarded refs allow
 * control from parent components (e.g. form libraries).
 */
const Input = forwardRef(({ className = '', type = 'text', ...props }, ref) => {
  const baseStyles =
    'flex h-10 w-full rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2 text-sm text-[#c9d1d9] placeholder-[#7d8590] focus:outline-none focus:ring-2 focus:ring-[#58a6ff] focus:border-[#58a6ff]';
  return (
    <input
      ref={ref}
      type={type}
      className={`${baseStyles} ${className}`}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export { Input };
export default Input;