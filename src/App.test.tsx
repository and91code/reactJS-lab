import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import App from './App';
import { TODO_STORAGE_KEY, useTodoStore } from './stores/useTodoStore';

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
    useTodoStore.setState({ todos: [], language: 'pt-BR' });
    localStorage.clear();
  });

  it('starts with an empty task list', () => {
    render(<App />);

    expect(screen.getByRole('heading', { level: 1, name: 'Seu dia, em ordem.' })).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('Nenhuma tarefa cadastrada.');
    expect(screen.queryByRole('table', { name: 'Lista de tarefas' })).not.toBeInTheDocument();
  });

  it('switches the application interface to English and persists the language', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.selectOptions(screen.getByRole('combobox', { name: 'Idioma' }), 'en-US');

    expect(screen.getByRole('heading', { level: 1, name: 'Your day, in order.' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'New task' })).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('No tasks yet.');
    expect(screen.getByRole('textbox', { name: 'Title' })).toHaveAttribute(
      'placeholder',
      'What do you need to do?',
    );
    expect(localStorage.getItem(TODO_STORAGE_KEY)).toContain('"language":"en-US"');
  });

  it('creates a task and toggles it to completed', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByRole('textbox', { name: 'Título' }), 'Comprar leite');
    await user.selectOptions(screen.getByRole('combobox', { name: 'Categoria' }), 'pessoal');
    await user.click(screen.getByRole('button', { name: 'Adicionar tarefa' }));

    const pendingRow = screen.getByRole('row', {
      name: /Comprar leite Pessoal Pendente Concluir/,
    });
    expect(within(pendingRow).getByText('Pendente')).toBeInTheDocument();
    expect(screen.getByText('Comprar leite')).not.toHaveClass('todo-title--completed');

    await user.click(screen.getByRole('button', { name: 'Concluir Comprar leite' }));

    const completedRow = screen.getByRole('row', {
      name: /Comprar leite Pessoal Concluída Reabrir/,
    });
    expect(within(completedRow).getByText('Concluída')).toBeInTheDocument();
    expect(screen.getByText('Comprar leite')).toHaveClass('todo-title--completed');
    expect(screen.getByRole('button', { name: 'Reabrir Comprar leite' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByText('Pendentes').previousElementSibling).toHaveTextContent('0');
  });
});