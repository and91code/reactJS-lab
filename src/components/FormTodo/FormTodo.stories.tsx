import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import FormTodo from './FormTodo';

const meta = {
  title: 'Components/FormTodo',
  component: FormTodo,
  tags: ['autodocs'],
  args: {
    onSubmit: fn(),
  },
} satisfies Meta<typeof FormTodo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ValidationError: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    await user.click(canvas.getByRole('button', { name: 'Adicionar tarefa' }));
    await expect(canvas.getByText('O título é obrigatório.')).toBeInTheDocument();
    await expect(canvas.getByText('A categoria é obrigatória.')).toBeInTheDocument();

    await user.type(canvas.getByRole('textbox', { name: 'Título' }), 'ab');
    await user.click(canvas.getByRole('button', { name: 'Adicionar tarefa' }));
    await expect(
      canvas.getByText('O título deve ter pelo menos 3 caracteres.'),
    ).toBeInTheDocument();
  },
};