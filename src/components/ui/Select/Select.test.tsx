import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import Select from './Select';

const options = [
  { label: 'Pessoal', value: 'personal' },
  { label: 'Trabalho', value: 'work' },
];

describe('Select', () => {
  it('renders a label, placeholder, and provided options', () => {
    render(<Select label="Categoria" placeholder="Selecione" options={options} />);

    const select = screen.getByRole('combobox', { name: 'Categoria' });
    expect(select).toHaveValue('');
    expect(screen.getByRole('option', { name: 'Pessoal' })).toHaveValue('personal');
  });

  it('supports selecting multiple values', async () => {
    const user = userEvent.setup();
    render(<Select label="Categorias" multiple options={options} />);

    const select = screen.getByRole('listbox', { name: 'Categorias' });
    await user.selectOptions(select, ['personal', 'work']);
    expect(select).toHaveValue(['personal', 'work']);
  });

  it('exposes the error state and message accessibly', () => {
    render(<Select label="Categoria" options={options} error="Selecione uma categoria." />);

    expect(screen.getByRole('combobox', { name: 'Categoria' })).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Selecione uma categoria.');
  });
});