import type { SelectHTMLAttributes } from 'react';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  label?: string;
  placeholder?: string;
  error?: string;
  hasError?: boolean;
}