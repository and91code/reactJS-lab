import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import TableTodos from './TableTodos';

const meta = {
  title: 'Components/TableTodos',
  component: TableTodos,
  tags: ['autodocs'],
  args: {
    onToggle: fn(),
  },
} satisfies Meta<typeof TableTodos>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    todos: [],
  },
};

export const WithTodos: Story = {
  args: {
    todos: [
      {
        id: 'todo-pessoal',
        title: 'Separar documentos da viagem',
        category: 'pessoal',
        completed: false,
        createdAt: new Date('2026-09-29T09:00:00.000Z'),
      },
      {
        id: 'todo-trabalho',
        title: 'Revisar apresentação trimestral',
        category: 'trabalho',
        completed: true,
        createdAt: new Date('2026-09-29T10:30:00.000Z'),
      },
    ],
  },
};