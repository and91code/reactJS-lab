import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Button from './Button';

describe('Button', () => {
  it('renders its content with the default variant and size', () => {
    render(<Button>Salvar</Button>);

    const button = screen.getByRole('button', { name: 'Salvar' });
    expect(button).toHaveClass('ui-button--primary', 'ui-button--md');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('supports variants, sizes, and native button props', () => {
    render(
      <Button variant="danger" size="lg" type="submit" data-testid="delete-button">
        Excluir
      </Button>,
    );

    const button = screen.getByTestId('delete-button');
    expect(button).toHaveClass('ui-button--danger', 'ui-button--lg');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('disables itself and exposes busy state while loading', () => {
    render(<Button isLoading>Enviando</Button>);

    const button = screen.getByRole('button', { name: 'Enviando' });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button.querySelector('.ui-button__spinner')).toBeInTheDocument();
  });

  it('respects the native disabled state', () => {
    render(<Button disabled>Indisponível</Button>);

    expect(screen.getByRole('button', { name: 'Indisponível' })).toBeDisabled();
  });

  it('calls the click handler when enabled', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Continuar</Button>);

    await user.click(screen.getByRole('button', { name: 'Continuar' }));

    expect(onClick).toHaveBeenCalledOnce();
  });
});