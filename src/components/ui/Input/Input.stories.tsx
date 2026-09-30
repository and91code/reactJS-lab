import type { Meta, StoryObj } from '@storybook/react-vite';
import Input from './Input';

const meta = {
  title: 'Design System/Input',
  component: Input,
  tags: ['autodocs'],
  args: { label: 'Endereço de e-mail', placeholder: 'nome@exemplo.com' },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithHelperText: Story = { args: { helperText: 'Usaremos este e-mail para contato.' } };
export const Error: Story = { args: { error: 'Informe um e-mail válido.' } };