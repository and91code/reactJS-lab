import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import App from './App';
import { useTodoStore } from './stores/useTodoStore';

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
    useTodoStore.setState({ todos: [] });
    localStorage.clear();
  });

  it('starts with an empty task list', () => {
    render(<App />);

    expect(screen.getByRole('heading', { level: 1, name: 'Seu dia, em ordem.' })).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('Nenhuma tarefa cadastrada.');
    expect(screen.queryByRole('table', { name: 'Lista de tarefas' })).not.toBeInTheDocument();
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