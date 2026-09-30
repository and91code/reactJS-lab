import z from "zod";
import { TODO_CATEGORIES } from "../../types/todo";

export const todoFormSchema = z.object({
  // Obrigatório: z.string() rejeita valores ausentes ou que não sejam texto.
  // A spec exige ao menos 3 caracteres e permite no máximo 50.
  title: z
    .string({ required_error: 'O título é obrigatório.' })
    .min(1, { message: 'O título é obrigatório.' })
    .min(3, { message: 'O título deve ter pelo menos 3 caracteres.' })
    .max(50, { message: 'O título deve ter no máximo 50 caracteres.' }),
  // Obrigatória: somente as três categorias da spec são aceitas.
  category: z.enum(TODO_CATEGORIES, {
    required_error: 'A categoria é obrigatória.',
    invalid_type_error: 'Selecione uma categoria válida.',
  }),
});

export type TodoFormValue = z.infer<typeof todoFormSchema>;