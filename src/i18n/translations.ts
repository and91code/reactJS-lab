import type { TodoCategory } from '../types/todo';

export type Language = 'pt-BR' | 'en-US';

export interface TodoFormValidationMessages {
  titleRequired: string;
  titleMin: string;
  titleMax: string;
  categoryRequired: string;
  categoryInvalid: string;
}

export interface TranslationMessages {
  app: {
    eyebrow: string;
    titleLead: string;
    titleEmphasis: string;
    subtitle: string;
    summaryLabel: string;
    totalTasks: string;
    pendingTasks: string;
  };
  language: {
    label: string;
    portuguese: string;
    english: string;
  };
  form: {
    heading: string;
    titleLabel: string;
    titlePlaceholder: string;
    categoryLabel: string;
    categoryPlaceholder: string;
    categories: Record<TodoCategory, string>;
    submit: string;
    validation: TodoFormValidationMessages;
  };
  table: {
    heading: string;
    listLabel: string;
    empty: string;
    titleColumn: string;
    categoryColumn: string;
    statusColumn: string;
    actionColumn: string;
    pending: string;
    completed: string;
    completeButton: string;
    reopenButton: string;
    completeAction: (title: string) => string;
    reopenAction: (title: string) => string;
  };
}

export const translations: Record<Language, TranslationMessages> = {
  'pt-BR': {
    app: {
      eyebrow: 'Planejamento pessoal',
      titleLead: 'Seu dia,',
      titleEmphasis: 'em ordem.',
      subtitle: 'Uma tarefa de cada vez, com clareza.',
      summaryLabel: 'Resumo das tarefas',
      totalTasks: 'Tarefas',
      pendingTasks: 'Pendentes',
    },
    language: {
      label: 'Idioma',
      portuguese: 'Português (Brasil)',
      english: 'English (US)',
    },
    form: {
      heading: 'Nova tarefa',
      titleLabel: 'Título',
      titlePlaceholder: 'O que você precisa fazer?',
      categoryLabel: 'Categoria',
      categoryPlaceholder: 'Selecione uma categoria',
      categories: {
        pessoal: 'Pessoal',
        trabalho: 'Trabalho',
        estudos: 'Estudos',
      },
      submit: 'Adicionar tarefa',
      validation: {
        titleRequired: 'O título é obrigatório.',
        titleMin: 'O título deve ter pelo menos 3 caracteres.',
        titleMax: 'O título deve ter no máximo 50 caracteres.',
        categoryRequired: 'A categoria é obrigatória.',
        categoryInvalid: 'Selecione uma categoria válida.',
      },
    },
    table: {
      heading: 'Tarefas',
      listLabel: 'Lista de tarefas',
      empty: 'Nenhuma tarefa cadastrada.',
      titleColumn: 'Título',
      categoryColumn: 'Categoria',
      statusColumn: 'Status',
      actionColumn: 'Ação',
      pending: 'Pendente',
      completed: 'Concluída',
      completeButton: 'Concluir',
      reopenButton: 'Reabrir',
      completeAction: (title) => `Concluir ${title}`,
      reopenAction: (title) => `Reabrir ${title}`,
    },
  },
  'en-US': {
    app: {
      eyebrow: 'Personal planning',
      titleLead: 'Your day,',
      titleEmphasis: 'in order.',
      subtitle: 'One task at a time, with clarity.',
      summaryLabel: 'Task summary',
      totalTasks: 'Tasks',
      pendingTasks: 'Pending',
    },
    language: {
      label: 'Language',
      portuguese: 'Português (Brasil)',
      english: 'English (US)',
    },
    form: {
      heading: 'New task',
      titleLabel: 'Title',
      titlePlaceholder: 'What do you need to do?',
      categoryLabel: 'Category',
      categoryPlaceholder: 'Select a category',
      categories: {
        pessoal: 'Personal',
        trabalho: 'Work',
        estudos: 'Study',
      },
      submit: 'Add task',
      validation: {
        titleRequired: 'Title is required.',
        titleMin: 'Title must be at least 3 characters.',
        titleMax: 'Title must be no more than 50 characters.',
        categoryRequired: 'Category is required.',
        categoryInvalid: 'Select a valid category.',
      },
    },
    table: {
      heading: 'Tasks',
      listLabel: 'Task list',
      empty: 'No tasks yet.',
      titleColumn: 'Title',
      categoryColumn: 'Category',
      statusColumn: 'Status',
      actionColumn: 'Action',
      pending: 'Pending',
      completed: 'Completed',
      completeButton: 'Complete',
      reopenButton: 'Reopen',
      completeAction: (title) => `Complete ${title}`,
      reopenAction: (title) => `Reopen ${title}`,
    },
  },
};