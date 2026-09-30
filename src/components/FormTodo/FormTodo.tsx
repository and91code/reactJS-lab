import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { translations } from '../../i18n/translations';
import { useTodoStore } from '../../stores/useTodoStore';
import { TODO_CATEGORIES } from '../../types/todo';
import {
  createTodoFormSchema,
  type TodoFormValue
} from './FormTodo.schema';
import type { FormTodoProps } from './FormTodo.types';
import { toOutput } from './FormTodo.utils';

export default function FormTodo({ onSubmit }: FormTodoProps) {
  const { form: formMessages } = useTodoStore((state) => translations[state.language]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TodoFormValue>({
    resolver: zodResolver(createTodoFormSchema(formMessages.validation)),
    defaultValues: { title: '', category: undefined },
  });

  const submitTodo = async (values: TodoFormValue) => {
    await onSubmit(toOutput(values));
    reset();
  };

  return (
    <section className="todo-form-section" aria-labelledby="todo-form-title">
      <h2 id="todo-form-title">{formMessages.heading}</h2>
      <form className="todo-form" noValidate onSubmit={handleSubmit(submitTodo)}>
        <div className="todo-field">
          <label htmlFor="todo-title">{formMessages.titleLabel}</label>
          <input
            id="todo-title"
            autoComplete="off"
            placeholder={formMessages.titlePlaceholder}
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? 'todo-title-error' : undefined}
            {...register('title')}
          />
          {errors.title?.message && (
            <p className="todo-error" id="todo-title-error" role="alert">
              {errors.title.message}
            </p>
          )}
        </div>

        <div className="todo-field">
          <label htmlFor="todo-category">{formMessages.categoryLabel}</label>
          <select
            id="todo-category"
            aria-invalid={Boolean(errors.category)}
            aria-describedby={errors.category ? 'todo-category-error' : undefined}
            {...register('category', {
              setValueAs: (value: string) => (value === '' ? undefined : value),
            })}
          >
            <option value="">
              {formMessages.categoryPlaceholder}
            </option>
            {TODO_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {formMessages.categories[category]}
              </option>
            ))}
          </select>
          {errors.category?.message && (
            <p className="todo-error" id="todo-category-error" role="alert">
              {errors.category.message}
            </p>
          )}
        </div>

        <button className="todo-submit" type="submit" disabled={isSubmitting}>
          <Plus size={18} aria-hidden="true" />
          {formMessages.submit}
        </button>
      </form>
    </section>
  );
}