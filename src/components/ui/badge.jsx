import React from 'react';

/**
 * Badge component to display small count or label. Supports an
 * `variant` prop to toggle outline styling. Additional Tailwind
 * classes can be provided through the `className` prop. The
 * component renders a span by default but can be changed via the
 * `as` prop.
 */
export function Badge({
  className = '',
  variant = 'default',
  as: Component = 'span',
  children,
  ...props
}) {
  const baseStyles =
    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors';
  const variants = {
    default: 'bg-[#161b22] text-[#c9d1d9]',
    outline: 'bg-transparent border border-[#30363d] text-[#c9d1d9]'
  };
  const classes = [baseStyles, variants[variant] || variants.default, className]
    .filter(Boolean)
    .join(' ');
  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}

export default Badge;