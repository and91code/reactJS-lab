import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import Textarea from './Textarea';

describe('Textarea', () => {
  it('associates its label and helper text with the native textarea', () => {
    render(<Textarea label="Descrição" helperText="Até 300 caracteres." rows={4} />);

    const textarea = screen.getByRole('textbox', { name: 'Descrição' });
    expect(textarea).toHaveAttribute('rows', '4');
    expect(textarea).toHaveAccessibleDescription('Até 300 caracteres.');
  });

  it('announces error state and message', () => {
    render(<Textarea label="Observações" error="Este campo é obrigatório." />);

    expect(screen.getByRole('textbox', { name: 'Observações' })).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Este campo é obrigatório.');
  });

  it('accepts user input', async () => {
    const user = userEvent.setup();
    render(<Textarea label="Mensagem" placeholder="Escreva aqui" />);

    const textarea = screen.getByRole('textbox', { name: 'Mensagem' });
    await user.type(textarea, 'Olá, mundo');
    expect(textarea).toHaveValue('Olá, mundo');
  });
});