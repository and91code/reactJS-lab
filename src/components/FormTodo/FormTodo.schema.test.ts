import { describe, expect, it } from 'vitest';
import { todoFormSchema } from './FormTodo.schema';

describe('todoFormSchema', () => {
  it('accepts both title length boundaries and every supported category', () => {
    const titles = ['abc', 'a'.repeat(50)];
    const categories = ['pessoal', 'trabalho', 'estudos'] as const;

    for (const title of titles) {
      for (const category of categories) {
        expect(todoFormSchema.safeParse({ title, category }).success).toBe(true);
      }
    }
  });

  it('rejects missing titles and titles outside the 3-to-50-character range', () => {
    expect(todoFormSchema.safeParse({ category: 'pessoal' }).success).toBe(false);
    expect(todoFormSchema.safeParse({ title: 'ab', category: 'pessoal' }).success).toBe(false);
    expect(todoFormSchema.safeParse({ title: 'a'.repeat(51), category: 'pessoal' }).success).toBe(false);
  });

  it('requires a category from the specification', () => {
    expect(todoFormSchema.safeParse({ title: 'Plan a task' }).success).toBe(false);
    expect(todoFormSchema.safeParse({ title: 'Plan a task', category: 'other' }).success).toBe(false);
  });
});