import type { Todo, TodoCategory } from '../../types/todo';
import type { TodoApiCategoryCode, TodoApiDTO } from './todo.api.dto';

const categoryToDomain: Record<TodoApiCategoryCode, TodoCategory> = {
  PERS: 'pessoal',
  WORK: 'trabalho',
  STUDY: 'estudos',
};

const categoryToApi: Record<TodoCategory, TodoApiCategoryCode> = {
  pessoal: 'PERS',
  trabalho: 'WORK',
  estudos: 'STUDY',
};

export function toDomain(dto: TodoApiDTO): Todo {
  return {
    id: dto.task_id,
    title: dto.task_title,
    category: categoryToDomain[dto.category_code],
    completed: dto.is_completed,
    createdAt: new Date(dto.created_at_utc),
  };
}

export function toPayload(
  todoData: Omit<Todo, 'id' | 'createdAt'>,
): Partial<TodoApiDTO> {
  return {
    task_title: todoData.title,
    category_code: categoryToApi[todoData.category],
    is_completed: todoData.completed,
  };
}