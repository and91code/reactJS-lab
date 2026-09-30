export const TODO_CATEGORIES = ['pessoal', 'trabalho', 'estudos'] as const;

export type TodoCategory = (typeof TODO_CATEGORIES)[number];

export interface Todo {
  /** Identificador único da tarefa. */
  id: string;
  /** Título da tarefa, limitado de 3 a 50 caracteres pela spec. */
  title: string;
  /** Categoria obrigatória dentre os valores definidos pela spec. */
  category: TodoCategory;
  /** Indica se a tarefa foi concluída. */
  completed: boolean;
  /** Data e hora em que a tarefa foi criada. */
  createdAt: Date;
}