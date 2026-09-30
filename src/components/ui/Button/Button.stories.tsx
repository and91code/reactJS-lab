import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from './Button';

const meta = {
  title: 'Design System/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Salvar' },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'danger', 'ghost'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Secondary: Story = { args: { variant: 'secondary', children: 'Cancelar' } };
export const Danger: Story = { args: { variant: 'danger', children: 'Excluir' } };
export const Ghost: Story = { args: { variant: 'ghost', children: 'Mais opções' } };
export const Loading: Story = { args: { isLoading: true, children: 'Salvando' } };