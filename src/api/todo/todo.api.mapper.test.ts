import { describe, expect, it } from 'vitest';
import type { TodoApiCategoryCode, TodoApiDTO } from './todo.api.dto';
import { toDomain, toPayload } from './todo.api.mapper';

describe('todo API mappers', () => {
  it.each([
    ['PERS', 'pessoal'],
    ['WORK', 'trabalho'],
    ['STUDY', 'estudos'],
  ] as const)('maps category code %s to domain category %s', (categoryCode, category) => {
    const dto: TodoApiDTO = {
      task_id: 'task-1',
      task_title: 'Review mapping',
      category_code: categoryCode,
      is_completed: true,
      created_at_utc: '2026-09-29T12:30:00.000Z',
    };

    expect(toDomain(dto)).toEqual({
      id: 'task-1',
      title: 'Review mapping',
      category,
      completed: true,
      createdAt: new Date('2026-09-29T12:30:00.000Z'),
    });
  });

  it.each([
    ['pessoal', 'PERS'],
    ['trabalho', 'WORK'],
    ['estudos', 'STUDY'],
  ] as const)('maps domain category %s to API code %s', (category, categoryCode) => {
    const categoryCodeValue: TodoApiCategoryCode = categoryCode;

    expect(
      toPayload({ title: 'Send payload', category, completed: false }),
    ).toEqual({
      task_title: 'Send payload',
      category_code: categoryCodeValue,
      is_completed: false,
    });
  });
});