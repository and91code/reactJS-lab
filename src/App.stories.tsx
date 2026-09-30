import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import App from './App';
import { useTodoStore } from './stores/useTodoStore';

const meta = {
  title: 'Application/To-Do',
  component: App,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  loaders: [() => {
    useTodoStore.setState({ todos: [], language: 'pt-BR' });
    return {};
  }],
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InitialInteraction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    await expect(canvas.getByRole('status')).toHaveTextContent('Nenhuma tarefa cadastrada.');
    await user.type(canvas.getByRole('textbox', { name: 'Título' }), 'Planejar a semana');
    await user.selectOptions(canvas.getByRole('combobox', { name: 'Categoria' }), 'estudos');
    await user.click(canvas.getByRole('button', { name: 'Adicionar tarefa' }));
    await expect(
      canvas.getByRole('row', { name: /Planejar a semana Estudos Pendente Concluir/ }),
    ).toBeInTheDocument();
  },
};