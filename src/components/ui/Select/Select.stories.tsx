import type { Meta, StoryObj } from '@storybook/react-vite';
import Select from './Select';

const meta = {
  title: 'Design System/Select',
  component: Select,
  tags: ['autodocs'],
  args: {
    label: 'Categoria',
    placeholder: 'Selecione uma categoria',
    options: [
      { label: 'Pessoal', value: 'pessoal' },
      { label: 'Trabalho', value: 'trabalho' },
      { label: 'Estudos', value: 'estudos' },
    ],
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Multiple: Story = { args: { multiple: true, placeholder: undefined } };
export const Error: Story = { args: { error: 'Selecione uma categoria válida.' } };