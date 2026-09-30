import { ListTodo } from 'lucide-react';
import { TodoAPI } from './api/todo/todo.api';
import styles from './App.module.css';
import FormTodo from './components/FormTodo/FormTodo';
import type { TodoFormOutput } from './components/FormTodo/FormTodo.utils';
import LanguageSelector from './components/LanguageSelector/LanguageSelector';
import TableTodos from './components/TableTodos/TableTodos';
import { translations } from './i18n/translations';
import { useTodoStore } from './stores/useTodoStore';

export default function App() {
  const todos = useTodoStore((state) => state.todos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const language = useTodoStore((state) => state.language);
  const messages = translations[language].app;
  const pendingCount = todos.filter((todo) => !todo.completed).length;

  const handleSubmit = async ({ title, category }: TodoFormOutput) => {
    const todo = await TodoAPI.createTodo({
      title,
      category,
      completed: false,
    });
    await addTodo(todo);
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <p className={styles.eyebrow}>
            <ListTodo size={18} aria-hidden="true" />
            {messages.eyebrow}
          </p>
          <div className={styles.headerContent}>
            <div>
              <h1 className={styles.title}>
                {messages.titleLead} <span>{messages.titleEmphasis}</span>
              </h1>
              <p className={styles.subtitle}>{messages.subtitle}</p>
            </div>
            <LanguageSelector />
            <div className={styles.summary} aria-label={messages.summaryLabel} aria-live="polite">
              <p>
                <strong>{todos.length}</strong>
                <span>{messages.totalTasks}</span>
              </p>
              <p>
                <strong>{pendingCount}</strong>
                <span>{messages.pendingTasks}</span>
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <FormTodo onSubmit={handleSubmit} />
        <TableTodos todos={todos} onToggle={toggleTodo} />
      </main>
    </div>
  );
}