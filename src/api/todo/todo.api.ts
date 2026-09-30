import type { Todo } from '../../types/todo';
import type { TodoApiDTO } from './todo.api.dto';
import { toDomain, toPayload } from './todo.api.mapper';

type TodoCreationData = Omit<Todo, 'id' | 'createdAt'>;

let mockServerTodos: TodoApiDTO[] = [];

const createTaskId = () =>
  globalThis.crypto?.randomUUID?.() ?? Date.now().toString();

const mockTransport = {
  async fetchTodos(): Promise<TodoApiDTO[]> {
    return mockServerTodos.map((dto) => ({ ...dto }));
  },

  async createTodo(payload: Partial<TodoApiDTO>): Promise<TodoApiDTO> {
    if (
      !payload.task_title ||
      !payload.category_code ||
      typeof payload.is_completed !== 'boolean'
    ) {
      throw new Error('O payload da tarefa está incompleto.');
    }

    const dto: TodoApiDTO = {
      task_id: createTaskId(),
      task_title: payload.task_title,
      category_code: payload.category_code,
      is_completed: payload.is_completed,
      created_at_utc: new Date().toISOString(),
    };

    mockServerTodos = [dto, ...mockServerTodos];
    return { ...dto };
  },
};

export const TodoAPI = {
  async fetchTodos(): Promise<Todo[]> {
    const dtos = await mockTransport.fetchTodos();
    return dtos.map(toDomain);
  },

  async createTodo(todoData: TodoCreationData): Promise<Todo> {
    const dto = await mockTransport.createTodo(toPayload(todoData));
    return toDomain(dto);
  },
};
