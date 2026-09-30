import { describe, expect, it } from 'vitest';
import type { Todo } from '../../types/todo';
import { toInput, toOutput } from './FormTodo.utils';

describe('FormTodo utils', () => {
  it('maps a domain todo to the form input fields', () => {
    const todo: Todo = {
      id: 'todo-1',
      title: 'Prepare release',
      category: 'trabalho',
      completed: true,
      createdAt: new Date('2026-09-29T12:00:00.000Z'),
    };

    expect(toInput(todo)).toEqual({
      title: 'Prepare release',
      category: 'trabalho',
    });
  });

  it('maps form values to a new incomplete domain todo payload', () => {
    expect(toOutput({ title: 'Plan study time', category: 'estudos' })).toEqual({
      title: 'Plan study time',
      category: 'estudos',
      completed: false,
    });
  });
});