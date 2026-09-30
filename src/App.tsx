import { ListTodo } from 'lucide-react';
import { TodoAPI } from './api/todo/todo.api';
import styles from './App.module.css';
import FormTodo from './components/FormTodo/FormTodo';
import type { TodoFormOutput } from './components/FormTodo/FormTodo.utils';
import TableTodos from './components/TableTodos/TableTodos';
import { useTodoStore } from './stores/useTodoStore';

export default function App() {
  const todos = useTodoStore((state) => state.todos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const pendingCount = todos.filter((todo) => !todo.completed).length;

  const handleSubmit = async ({ title, category }: TodoFormOutput) => {
    const todo = await TodoAPI.createTodo({
      title,
      category,
      completed: false,
    });
    addTodo(todo)
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <p className={styles.eyebrow}>
            <ListTodo size={18} aria-hidden="true" />
            Planejamento pessoal
          </p>
          <div className={styles.headerContent}>
            <div>
              <h1 className={styles.title}>
                Seu dia, <span>em ordem.</span>
              </h1>
              <p className={styles.subtitle}>Uma tarefa de cada vez, com clareza.</p>
            </div>
            <div className={styles.summary} aria-label="Resumo das tarefas" aria-live="polite">
              <p>
                <strong>{todos.length}</strong>
                <span>Tarefas</span>
              </p>
              <p>
                <strong>{pendingCount}</strong>
                <span>Pendentes</span>
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