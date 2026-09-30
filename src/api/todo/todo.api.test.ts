import { describe, expect, it } from 'vitest';
import { TodoAPI } from './todo.api';

describe('TodoAPI', () => {
  it('creates and fetches domain todos without exposing API DTO fields', async () => {
    const createdTodo = await TodoAPI.createTodo({
      title: `API task ${Date.now()}`,
      category: 'trabalho',
      completed: false,
    });

    expect(createdTodo).toMatchObject({
      title: expect.stringContaining('API task'),
      category: 'trabalho',
      completed: false,
    });
    expect(createdTodo.id).toBeTruthy();
    expect(createdTodo.createdAt).toBeInstanceOf(Date);
    expect(createdTodo).not.toHaveProperty('task_id');

    const fetchedTodos = await TodoAPI.fetchTodos();
    expect(fetchedTodos).toContainEqual(createdTodo);
  });
});