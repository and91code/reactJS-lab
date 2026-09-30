import { forwardRef, useId } from 'react';
import type { SelectProps } from './Select.types';

const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    id,
    label,
    options,
    placeholder,
    error,
    hasError = false,
    className = '',
    multiple = false,
    'aria-describedby': ariaDescribedBy,
    children,
    ...selectProps
  },
  ref,
) {
  const generatedId = useId();
  const selectId = id ?? `ui-select-${generatedId.replaceAll(':', '')}`;
  const errorId = `${selectId}-error`;
  const isInvalid = hasError || Boolean(error);
  const describedBy = [ariaDescribedBy, error ? errorId : undefined].filter(Boolean).join(' ') || undefined;

  return (
    <div className="ui-field">
      {label && <label className="ui-field__label" htmlFor={selectId}>{label}</label>}
      <select
        {...selectProps}
        ref={ref}
        id={selectId}
        multiple={multiple}
        className={['ui-control', 'ui-select', isInvalid ? 'ui-control--error' : '', className]
          .filter(Boolean)
          .join(' ')}
        aria-invalid={isInvalid || undefined}
        aria-describedby={describedBy}
      >
        {!multiple && placeholder !== undefined && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
        {children}
      </select>
      {error && <p className="ui-field__error" id={errorId} role="alert">{error}</p>}
    </div>
  );
});

export default Select;