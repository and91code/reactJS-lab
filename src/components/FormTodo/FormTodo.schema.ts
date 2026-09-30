import { z } from 'zod';
import type { TodoFormValidationMessages } from '../../i18n/translations';
import { TODO_CATEGORIES } from '../../types/todo';

export function createTodoFormSchema(messages: TodoFormValidationMessages) {
  return z.object({
    title: z
      .string({ required_error: messages.titleRequired })
      .min(1, { message: messages.titleRequired })
      .min(3, { message: messages.titleMin })
      .max(50, { message: messages.titleMax }),
    category: z.enum(TODO_CATEGORIES, {
      required_error: messages.categoryRequired,
      invalid_type_error: messages.categoryInvalid,
    }),
  });
}

export const todoFormSchema = createTodoFormSchema({
  titleRequired: 'O título é obrigatório.',
  titleMin: 'O título deve ter pelo menos 3 caracteres.',
  titleMax: 'O título deve ter no máximo 50 caracteres.',
  categoryRequired: 'A categoria é obrigatória.',
  categoryInvalid: 'Selecione uma categoria válida.',
});

export type TodoFormValue = z.infer<typeof todoFormSchema>;