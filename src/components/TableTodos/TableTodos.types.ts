import type { Todo } from '../../types/todo';

export interface TableTodosProps {
  todos: Todo[];
  onToggle: (todoId: Todo['id']) => void;
}