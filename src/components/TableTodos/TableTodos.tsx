import { Check, RotateCcw } from 'lucide-react';
import type { Todo, TodoCategory } from '../../types/todo';
import type { TableTodosProps } from './TableTodos.types';

const categoryLabels: Record<TodoCategory, string> = {
  pessoal: 'Pessoal',
  trabalho: 'Trabalho',
  estudos: 'Estudos',
};

export default function TableTodos({ todos, onToggle }: TableTodosProps) {
  return (
    <section className="todo-list-section" aria-labelledby="todo-list-title">
      <h2 id="todo-list-title">Tarefas</h2>
      {todos.length === 0 ? (
        <p className="todo-empty-state" role="status">
          Nenhuma tarefa cadastrada.
        </p>
      ) : (
        <div className="todo-table-scroll">
          <table className="todo-table" aria-label="Lista de tarefas">
            <thead>
              <tr>
                <th scope="col">Título</th>
                <th scope="col">Categoria</th>
                <th scope="col">Status</th>
                <th scope="col">Ação</th>
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
                      {todo.completed ? 'Concluída' : 'Pendente'}
                    </span>
                  </td>
                  <td>
                    <button
                      className="todo-toggle"
                      type="button"
                      aria-label={`${todo.completed ? 'Reabrir' : 'Concluir'} ${todo.title}`}
                      aria-pressed={todo.completed}
                      onClick={() => onToggle(todo.id)}
                    >
                      {todo.completed ? (
                        <>
                          <RotateCcw size={16} aria-hidden="true" />
                          Reabrir
                        </>
                      ) : (
                        <>
                          <Check size={16} aria-hidden="true" />
                          Concluir
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