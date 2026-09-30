import { Check, RotateCcw } from 'lucide-react';
import { translations } from '../../i18n/translations';
import { useTodoStore } from '../../stores/useTodoStore';
import type { Todo, TodoCategory } from '../../types/todo';
import type { TableTodosProps } from './TableTodos.types';

export default function TableTodos({ todos, onToggle }: TableTodosProps) {
  const language = useTodoStore((state) => state.language);
  const messages = translations[language].table;
  const categoryLabels: Record<TodoCategory, string> = translations[language].form.categories;

  return (
    <section className="todo-list-section" aria-labelledby="todo-list-title">
      <h2 id="todo-list-title">{messages.heading}</h2>
      {todos.length === 0 ? (
        <p className="todo-empty-state" role="status">
          {messages.empty}
        </p>
      ) : (
        <div className="todo-table-scroll">
          <table className="todo-table" aria-label={messages.listLabel}>
            <thead>
              <tr>
                <th scope="col">{messages.titleColumn}</th>
                <th scope="col">{messages.categoryColumn}</th>
                <th scope="col">{messages.statusColumn}</th>
                <th scope="col">{messages.actionColumn}</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo: Todo) => (
                <tr key={todo.id}>
                  <th scope="row">
                    <span className={todo.completed ? 'todo-title todo-title--completed' : 'todo-title'}>
                      {todo.title}
                    </span>
                  </th>
                  <td>{categoryLabels[todo.category]}</td>
                  <td>
                    <span className={todo.completed ? 'todo-status todo-status--completed' : 'todo-status'}>
                      {todo.completed ? messages.completed : messages.pending}
                    </span>
                  </td>
                  <td>
                    <button
                      className="todo-toggle"
                      type="button"
                      aria-label={todo.completed
                        ? messages.reopenAction(todo.title)
                        : messages.completeAction(todo.title)}
                      aria-pressed={todo.completed}
                      onClick={() => onToggle(todo.id)}
                    >
                      {todo.completed ? (
                        <>
                          <RotateCcw size={16} aria-hidden="true" />
                          {messages.reopenButton}
                        </>
                      ) : (
                        <>
                          <Check size={16} aria-hidden="true" />
                          {messages.completeButton}
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}