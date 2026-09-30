import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useTodoStore } from '../../stores/useTodoStore';
import FormTodo from './FormTodo';

describe('FormTodo', () => {
  beforeEach(() => {
    localStorage.clear();
    useTodoStore.setState({ language: 'pt-BR' });
    localStorage.clear();
  });

  it('shows required field errors when submitted empty', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<FormTodo onSubmit={onSubmit} />);
    await user.click(screen.getByRole('button', { name: 'Adicionar tarefa' }));

    expect(await screen.findByText('O título é obrigatório.')).toBeInTheDocument();
    expect(await screen.findByText('A categoria é obrigatória.')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('shows the minimum and maximum title validation messages', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<FormTodo onSubmit={onSubmit} />);
    await user.selectOptions(screen.getByRole('combobox', { name: 'Categoria' }), 'pessoal');
    await user.type(screen.getByRole('textbox', { name: 'Título' }), 'ab');
    await user.click(screen.getByRole('button', { name: 'Adicionar tarefa' }));
    expect(await screen.findByText('O título deve ter pelo menos 3 caracteres.')).toBeInTheDocument();

    const titleInput = screen.getByRole('textbox', { name: 'Título' });
    await user.clear(titleInput);
    await user.type(titleInput, 'a'.repeat(51));
    await user.click(screen.getByRole('button', { name: 'Adicionar tarefa' }));

    expect(await screen.findByText('O título deve ter no máximo 50 caracteres.')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('submits validated values and clears the form after success', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<FormTodo onSubmit={onSubmit} />);
    await user.type(screen.getByRole('textbox', { name: 'Título' }), 'Comprar leite');
    await user.selectOptions(screen.getByRole('combobox', { name: 'Categoria' }), 'pessoal');
    await user.click(screen.getByRole('button', { name: 'Adicionar tarefa' }));

    expect(onSubmit).toHaveBeenCalledWith({
      title: 'Comprar leite',
      category: 'pessoal',
      completed: false,
    });
    expect(screen.getByRole('textbox', { name: 'Título' })).toHaveValue('');
    expect(screen.getByRole('combobox', { name: 'Categoria' })).toHaveValue('');
  });

  it('only offers the categories allowed by the schema', () => {
    render(<FormTodo onSubmit={vi.fn()} />);

    const categorySelect = screen.getByRole('combobox', { name: 'Categoria' });
    expect(within(categorySelect).getAllByRole('option').map((option) => option.getAttribute('value'))).toEqual([
      '',
      'pessoal',
      'trabalho',
      'estudos',
    ]);
  });

  it('shows validation errors in the selected language', async () => {
    const user = userEvent.setup();
    useTodoStore.getState().setLanguage('en-US');
    render(<FormTodo onSubmit={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: 'Add task' }));

    expect(await screen.findByText('Title is required.')).toBeInTheDocument();
    expect(await screen.findByText('Category is required.')).toBeInTheDocument();
  });
});