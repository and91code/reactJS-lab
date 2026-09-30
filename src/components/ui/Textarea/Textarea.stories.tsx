import type { Meta, StoryObj } from '@storybook/react-vite';
import Textarea from './Textarea';

const meta = {
  title: 'Design System/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  args: { label: 'Descrição', placeholder: 'Escreva sua mensagem', rows: 4 },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithHelperText: Story = { args: { helperText: 'Até 300 caracteres.' } };
export const Error: Story = { args: { error: 'A descrição é obrigatória.' } };