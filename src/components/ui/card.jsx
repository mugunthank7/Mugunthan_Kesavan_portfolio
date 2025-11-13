import React from 'react';

/**
 * Generic card container used throughout the portfolio. Accepts any
 * additional Tailwind classes via the `className` prop. Cards are
 * rendered as simple divs with rounded corners and overflow handling.
 */
export function Card({ className = '', children, ...props }) {
  return (
    <div
      className={`rounded-lg border shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Content wrapper for cards. Adds padding by default. Use the
 * `className` prop to override or extend padding classes.
 */
export function CardContent({ className = '', children, ...props }) {
  return (
    <div className={`${className}`} {...props}>
      {children}
    </div>
  );
}

export default Card;