import { beforeEach, describe, expect, it } from 'vitest';
import type { Todo } from '../types/todo';
import { TODO_STORAGE_KEY, useTodoStore } from './useTodoStore';

const createTodo = (overrides: Partial<Todo> = {}): Todo => ({
  id: 'todo-1',
  title: 'Study Zustand',
  category: 'estudos',
  completed: false,
  createdAt: new Date('2025-01-15T10:00:00.000Z'),
  ...overrides,
});

describe('useTodoStore', () => {
  beforeEach(() => {
    localStorage.clear();
    useTodoStore.setState({ todos: [], language: 'pt-BR' });
    localStorage.clear();
  });

  it('starts with an empty list', () => {
    expect(useTodoStore.getState().todos).toEqual([]);
    expect(useTodoStore.getState().language).toBe('pt-BR');
  });

  it('sets the selected language', () => {
    useTodoStore.getState().setLanguage('en-US');

    expect(useTodoStore.getState().language).toBe('en-US');
  });

  it('toggles between Portuguese and English', () => {
    useTodoStore.getState().toggleLanguage();
    expect(useTodoStore.getState().language).toBe('en-US');

    useTodoStore.getState().toggleLanguage();
    expect(useTodoStore.getState().language).toBe('pt-BR');
  });

  it('adds a todo to the beginning of the list', async () => {
    const firstTodo = createTodo({ id: 'todo-1', title: 'First task' });
    const secondTodo = createTodo({ id: 'todo-2', title: 'Second task' });

    await useTodoStore.getState().addTodo(firstTodo);
    await useTodoStore.getState().addTodo(secondTodo);

    expect(useTodoStore.getState().todos).toEqual([secondTodo, firstTodo]);
  });

  it('preserves all todo fields when adding an item', async () => {
    const todo = createTodo({
      id: 'custom-id',
      title: 'Prepare presentation',
      category: 'trabalho',
      createdAt: new Date('2025-02-01T12:30:00.000Z'),
    });

    await useTodoStore.getState().addTodo(todo);

    expect(useTodoStore.getState().todos[0]).toEqual(todo);
  });

  it('toggles completion status in both directions', async () => {
    await useTodoStore.getState().addTodo(createTodo());

    useTodoStore.getState().toggleTodo('todo-1');
    expect(useTodoStore.getState().todos[0].completed).toBe(true);

    useTodoStore.getState().toggleTodo('todo-1');
    expect(useTodoStore.getState().todos[0].completed).toBe(false);
  });

  it('does not change todos when toggling an unknown id', async () => {
    const todo = createTodo();
    await useTodoStore.getState().addTodo(todo);

    useTodoStore.getState().toggleTodo('unknown-id');

    expect(useTodoStore.getState().todos).toEqual([todo]);
  });

  it('removes only the todo matching the given id', async () => {
    const firstTodo = createTodo({ id: 'todo-1' });
    const secondTodo = createTodo({ id: 'todo-2', title: 'Another task' });

    await useTodoStore.getState().addTodo(firstTodo);
    await useTodoStore.getState().addTodo(secondTodo);
    useTodoStore.getState().removeTodo('todo-1');

    expect(useTodoStore.getState().todos).toEqual([secondTodo]);
  });

  it('does not change todos when removing an unknown id', async () => {
    const todo = createTodo();
    await useTodoStore.getState().addTodo(todo);

    useTodoStore.getState().removeTodo('unknown-id');

    expect(useTodoStore.getState().todos).toEqual([todo]);
  });

  it('clears completed todos and keeps pending todos', async () => {
    const pendingTodo = createTodo({ id: 'pending', completed: false });
    const completedTodo = createTodo({
      id: 'completed',
      title: 'Completed task',
      completed: true,
    });

    await useTodoStore.getState().addTodo(pendingTodo);
    await useTodoStore.getState().addTodo(completedTodo);
    useTodoStore.getState().clearCompleted();

    expect(useTodoStore.getState().todos).toEqual([pendingTodo]);
  });

  it('keeps the list unchanged when there are no completed todos', async () => {
    const todo = createTodo();
    await useTodoStore.getState().addTodo(todo);

    useTodoStore.getState().clearCompleted();

    expect(useTodoStore.getState().todos).toEqual([todo]);
  });

  it('persists todos under the configured localStorage key', async () => {
    await useTodoStore.getState().addTodo(createTodo());
    useTodoStore.getState().setLanguage('en-US');

    const serialized = localStorage.getItem(TODO_STORAGE_KEY);

    expect(serialized).not.toBeNull();
    expect(JSON.parse(serialized!).state.todos[0].id).toBe('todo-1');
    expect(JSON.parse(serialized!).state.language).toBe('en-US');
  });

  it('rehydrates todos and restores createdAt as a Date', async () => {
    const todo = createTodo();
    await useTodoStore.getState().addTodo(todo);
    useTodoStore.getState().setLanguage('en-US');

    const serialized = localStorage.getItem(TODO_STORAGE_KEY);
    expect(serialized).not.toBeNull();

    useTodoStore.setState({ todos: [], language: 'pt-BR' });
    localStorage.setItem(TODO_STORAGE_KEY, serialized!);
    await useTodoStore.persist.rehydrate();

    expect(useTodoStore.getState().todos).toHaveLength(1);
    expect(useTodoStore.getState().todos[0]).toMatchObject({
      id: todo.id,
      title: todo.title,
      category: todo.category,
      completed: todo.completed,
    });
    expect(useTodoStore.getState().todos[0].createdAt).toBeInstanceOf(Date);
    expect(useTodoStore.getState().todos[0].createdAt.toISOString()).toBe(
      todo.createdAt.toISOString(),
    );
    expect(useTodoStore.getState().language).toBe('en-US');
  });
});