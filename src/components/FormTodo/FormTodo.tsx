import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { translations } from '../../i18n/translations';
import { useTodoStore } from '../../stores/useTodoStore';
import { TODO_CATEGORIES } from '../../types/todo';
import Button from '../ui/Button/Button';
import Input from '../ui/Input/Input';
import Select from '../ui/Select/Select';
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
        <Input
          id="todo-title"
          label={formMessages.titleLabel}
          autoComplete="off"
          placeholder={formMessages.titlePlaceholder}
          error={errors.title?.message}
          {...register('title')}
        />

        <Select
          id="todo-category"
          label={formMessages.categoryLabel}
          placeholder={formMessages.categoryPlaceholder}
          options={TODO_CATEGORIES.map((category) => ({
            value: category,
            label: formMessages.categories[category],
          }))}
          error={errors.category?.message}
          {...register('category', {
            setValueAs: (value: string) => (value === '' ? undefined : value),
          })}
        />

        <Button className="todo-submit" type="submit" isLoading={isSubmitting}>
          <Plus size={18} aria-hidden="true" />
          {formMessages.submit}
        </Button>
      </form>
    </section>
  );
}