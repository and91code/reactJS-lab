import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Language } from '../i18n/translations';
import type { Todo } from '../types/todo';

export const TODO_STORAGE_KEY = '@todo-app:store-v1';

export interface TodoState {
  todos: Todo[];
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  addTodo: (todo: Todo) => Promise<void>;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  clearCompleted: () => void;
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: [],
      language: 'pt-BR',
      setLanguage: (language) => set({ language }),
      toggleLanguage: () =>
        set((state) => ({ language: state.language === 'pt-BR' ? 'en-US' : 'pt-BR' })),
      addTodo: async (todo: Todo) => {
        set((state) => ({ todos: [todo, ...state.todos] }));
      },
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo,
          ),
        })),
      removeTodo: (id) =>
        set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) })),
      clearCompleted: () =>
        set((state) => ({ todos: state.todos.filter((todo) => !todo.completed) })),
    }),
    {
      name: TODO_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage, {
        reviver: (key, value) =>
          key === 'createdAt' && typeof value === 'string' ? new Date(value) : value,
      }),
    },
  ),
);