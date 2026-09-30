import type { Meta, StoryObj } from '@storybook/react-vite';
import { useTodoStore } from '../../stores/useTodoStore';
import LanguageSelector from './LanguageSelector';

const meta = {
  title: 'Components/LanguageSelector',
  component: LanguageSelector,
  tags: ['autodocs'],
  loaders: [() => {
    useTodoStore.setState({ language: 'pt-BR' });
    return {};
  }],
} satisfies Meta<typeof LanguageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};