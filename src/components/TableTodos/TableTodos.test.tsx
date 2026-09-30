import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useTodoStore } from '../../stores/useTodoStore';
import type { Todo } from '../../types/todo';
import TableTodos from './TableTodos';

const todos: Todo[] = [
  {
    id: 'todo-1',
    title: 'Comprar leite',
    category: 'pessoal',
    completed: false,
    createdAt: new Date('2026-09-29T09:00:00.000Z'),
  },
  {
    id: 'todo-2',
    title: 'Enviar relatório',
    category: 'trabalho',
    completed: true,
    createdAt: new Date('2026-09-29T10:00:00.000Z'),
  },
];

describe('TableTodos', () => {
  beforeEach(() => {
    localStorage.clear();
    useTodoStore.setState({ language: 'pt-BR' });
    localStorage.clear();
  });

  it('shows an accessible empty state when there are no todos', () => {
    render(<TableTodos todos={[]} onToggle={vi.fn()} />);

    expect(screen.getByRole('status')).toHaveTextContent('Nenhuma tarefa cadastrada.');
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('renders todo details and visually marks completed todos', () => {
    render(<TableTodos todos={todos} onToggle={vi.fn()} />);

    expect(screen.getByRole('table', { name: 'Lista de tarefas' })).toBeInTheDocument();
    expect(screen.getByRole('row', { name: /Comprar leite Pessoal Pendente Concluir/ })).toBeInTheDocument();
    expect(screen.getByRole('row', { name: /Enviar relatório Trabalho Concluída Reabrir/ })).toBeInTheDocument();
    expect(screen.getByText('Enviar relatório')).toHaveClass('todo-title--completed');
    expect(screen.getByRole('button', { name: 'Reabrir Enviar relatório' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('calls onToggle with the todo id when the completion button is clicked', async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();

    render(<TableTodos todos={todos} onToggle={onToggle} />);
    await user.click(screen.getByRole('button', { name: 'Concluir Comprar leite' }));

    expect(onToggle).toHaveBeenCalledWith('todo-1');
  });

  it('renders headers, category, status and actions in English', () => {
    useTodoStore.getState().setLanguage('en-US');
    render(<TableTodos todos={todos} onToggle={vi.fn()} />);

    expect(screen.getByRole('table', { name: 'Task list' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Title' })).toBeInTheDocument();
    expect(screen.getByRole('row', { name: /Comprar leite Personal Pending Complete/ })).toBeInTheDocument();
    expect(screen.getByRole('row', { name: /Enviar relatório Work Completed Reopen/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Complete Comprar leite' })).toBeInTheDocument();
  });
});