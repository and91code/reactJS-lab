import { forwardRef, useId } from 'react';
import type { InputProps } from './Input.types';

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    id,
    label,
    helperText,
    error,
    hasError = false,
    className = '',
    'aria-describedby': ariaDescribedBy,
    ...inputProps
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? `ui-input-${generatedId.replaceAll(':', '')}`;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;
  const isInvalid = hasError || Boolean(error);
  const describedBy = [ariaDescribedBy, helperText ? helperId : undefined, error ? errorId : undefined]
    .filter(Boolean)
    .join(' ') || undefined;

  return (
    <div className="ui-field">
      {label && <label className="ui-field__label" htmlFor={inputId}>{label}</label>}
      <input
        {...inputProps}
        ref={ref}
        id={inputId}
        className={['ui-control', 'ui-input', isInvalid ? 'ui-control--error' : '', className]
          .filter(Boolean)
          .join(' ')}
        aria-invalid={isInvalid || undefined}
        aria-describedby={describedBy}
      />
      {helperText && !error && <p className="ui-field__helper" id={helperId}>{helperText}</p>}
      {error && <p className="ui-field__error" id={errorId} role="alert">{error}</p>}
    </div>
  );
});

export default Input;