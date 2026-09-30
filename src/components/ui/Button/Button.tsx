import { forwardRef } from 'react';
import type { ButtonProps } from './Button.types';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    isLoading = false,
    disabled = false,
    type = 'button',
    className = '',
    children,
    ...buttonProps
  },
  ref,
) {
  const classes = ['ui-button', `ui-button--${variant}`, `ui-button--${size}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      {...buttonProps}
      ref={ref}
      className={classes}
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
    >
      {isLoading && <span className="ui-button__spinner" aria-hidden="true" />}
      {children}
    </button>
  );
});

export default Button;