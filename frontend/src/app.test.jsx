import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import App from './app';

describe('App', () => {
  afterEach(() => {
    cleanup();
  });

  it('Debe renderizar el titulo y el boton', () => {
    render(<App />);
    
    expect(screen.getByText('Weather Forecast')).toBeDefined();
    expect(screen.getByText('Viña del Mar, Chile')).toBeDefined();
    expect(screen.getByText('Ver Clima')).toBeDefined();
  });

  it('El boton debe estar habilitado inicialmente', () => {
    render(<App />);
    
    const button = screen.getByRole('button', { name: /ver clima/i });
    expect(button.disabled).toBe(false);
  });
});
