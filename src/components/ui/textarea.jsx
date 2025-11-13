import React, { forwardRef } from 'react';

/**
 * Textarea component for multi-line input. Shares a similar dark
 * appearance with the Input component. Uses forwardRef so the
 * underlying textarea can be accessed by parent components. The
 * `rows` prop defaults to 3.
 */
const Textarea = forwardRef(
  ({ className = '', rows = 3, ...props }, ref) => {
    const baseStyles =
      'w-full rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2 text-sm text-[#c9d1d9] placeholder-[#7d8590] focus:outline-none focus:ring-2 focus:ring-[#58a6ff] focus:border-[#58a6ff] resize-none';
    return (
      <textarea
        ref={ref}
        rows={rows}
        className={`${baseStyles} ${className}`}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
export default Textarea;