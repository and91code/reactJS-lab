import type { TodoFormOutput } from './FormTodo.utils';

export interface FormTodoProps {
  onSubmit: (values: TodoFormOutput) => void | Promise<void>;
}