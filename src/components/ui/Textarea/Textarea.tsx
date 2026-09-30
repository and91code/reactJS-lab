import { forwardRef, useId } from 'react';
import type { TextareaProps } from './Textarea.types';

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    id,
    label,
    helperText,
    error,
    hasError = false,
    className = '',
    'aria-describedby': ariaDescribedBy,
    ...textareaProps
  },
  ref,
) {
  const generatedId = useId();
  const textareaId = id ?? `ui-textarea-${generatedId.replaceAll(':', '')}`;
  const helperId = `${textareaId}-helper`;
  const errorId = `${textareaId}-error`;
  const isInvalid = hasError || Boolean(error);
  const describedBy = [ariaDescribedBy, helperText ? helperId : undefined, error ? errorId : undefined]
    .filter(Boolean)
    .join(' ') || undefined;

  return (
    <div className="ui-field">
      {label && <label className="ui-field__label" htmlFor={textareaId}>{label}</label>}
      <textarea
        {...textareaProps}
        ref={ref}
        id={textareaId}
        className={['ui-control', 'ui-textarea', isInvalid ? 'ui-control--error' : '', className]
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

export default Textarea;