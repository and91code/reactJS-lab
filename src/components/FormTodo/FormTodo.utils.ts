import type { Todo } from '../../types/todo';
import type { TodoFormValue } from './FormTodo.schema';

export type TodoFormOutput = Omit<Todo, 'id' | 'createdAt'>;

export function toInput(domainTodo: Todo): TodoFormValue {
  return {
    title: domainTodo.title,
    category: domainTodo.category,
  };
}

export function toOutput(formValues: TodoFormValue): TodoFormOutput {
  return {
    title: formValues.title,
    category: formValues.category,
    completed: false,
  };
}