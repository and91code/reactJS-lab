import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import Input from './Input';

describe('Input', () => {
  it('associates its label and helper text with the native input', () => {
    render(<Input label="Nome" helperText="Informe seu nome completo." name="name" />);

    const input = screen.getByRole('textbox', { name: 'Nome' });
    expect(input).toHaveAttribute('name', 'name');
    expect(input).toHaveAccessibleDescription('Informe seu nome completo.');
  });

  it('exposes error state and announces the error message', () => {
    render(<Input label="E-mail" error="Informe um e-mail válido." />);

    const input = screen.getByRole('textbox', { name: 'E-mail' });
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Informe um e-mail válido.');
    expect(screen.getByRole('alert')).toHaveTextContent('Informe um e-mail válido.');
  });

  it('accepts native input props and user input', async () => {
    const user = userEvent.setup();
    render(<Input label="Busca" type="search" placeholder="Buscar" />);

    const input = screen.getByRole('searchbox', { name: 'Busca' });
    await user.type(input, 'design system');
    expect(input).toHaveValue('design system');
  });
});