import React, { forwardRef } from 'react';

/**
 * Button component built with Tailwind CSS. Supports `variant` and
 * `size` props to adjust styling. Pass additional Tailwind classes
 * through the `className` prop to override defaults. The component
 * forwards refs to the underlying button element for integration
 * with form libraries or animation libraries.
 */
const Button = forwardRef(
  (
    {
      className = '',
      variant = 'default',
      size = 'default',
      type = 'button',
      children,
      ...props
    },
    ref
  ) => {
    // Base button styles
    const baseStyles =
      'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

    // Variant styles
    const variants = {
      default:
        'bg-[#161b22] text-[#c9d1d9] hover:bg-[#30363d] focus:ring-[#58a6ff] border border-transparent',
      outline:
        'bg-transparent text-[#c9d1d9] border border-[#30363d] hover:bg-[#161b22] focus:ring-[#58a6ff]'
    };

    // Size styles
    const sizes = {
      default: 'h-10 px-4 py-2',
      sm: 'h-8 px-3',
      lg: 'h-12 px-6'
    };

    const classes = [
      baseStyles,
      variants[variant] || variants.default,
      sizes[size] || sizes.default,
      className
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button ref={ref} type={type} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
export default Button;