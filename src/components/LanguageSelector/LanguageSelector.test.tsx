import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { useTodoStore } from '../../stores/useTodoStore';
import LanguageSelector from './LanguageSelector';

describe('LanguageSelector', () => {
  beforeEach(() => {
    localStorage.clear();
    useTodoStore.setState({ language: 'pt-BR' });
    localStorage.clear();
  });

  it('changes the selected language and updates its accessible label', async () => {
    const user = userEvent.setup();
    render(<LanguageSelector />);

    const selector = screen.getByRole('combobox', { name: 'Idioma' });
    expect(selector).toHaveValue('pt-BR');

    await user.selectOptions(selector, 'en-US');

    expect(useTodoStore.getState().language).toBe('en-US');
    expect(screen.getByRole('combobox', { name: 'Language' })).toHaveValue('en-US');
  });
});