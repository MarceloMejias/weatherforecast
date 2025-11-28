import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './app';

describe('App', () => {
  it('Debe renderizar el titulo y el boton', () => {
    render(<App />);
    
    expect(screen.getByText('Weather Forecast')).toBeDefined();
    expect(screen.getByText('Viña del Mar, Chile')).toBeDefined();
    expect(screen.getByText('Ver Clima')).toBeDefined();
  });

  it('El boton debe estar habilitado inicialmente', () => {
    render(<App />);
    
    const button = screen.getByRole('button');
    expect(button.disabled).toBe(false);
  });
});
