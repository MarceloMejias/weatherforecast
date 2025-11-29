import { describe, it, expect, afterEach, vi, beforeEach } from 'vitest';
import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import App from './app';

describe('App', () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
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

  it('Debe mostrar el clima cuando la peticion es exitosa', async () => {
    const mockWeatherData = {
      temperature: 20,
      windspeed: 15,
      condition: 'Soleado'
    };

    globalThis.fetch.mockResolvedValueOnce({
      json: async () => mockWeatherData
    });

    render(<App />);
    
    const button = screen.getByRole('button', { name: /ver clima/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('20°C')).toBeDefined();
    });

    // Verificar todos los elementos del weather-info
    expect(screen.getByText('20°C')).toBeDefined();
    expect(screen.getByText(/Viento: 15 km\/h/)).toBeDefined();
    expect(screen.getByText(/Código: Soleado/)).toBeDefined();
    expect(screen.getByText('💨')).toBeDefined();
    expect(screen.getByText('🌡️')).toBeDefined();
  });

  it('Debe mostrar error cuando la peticion falla', async () => {
    globalThis.fetch.mockResolvedValueOnce({
      json: async () => ({ error: 'Error del servidor' })
    });

    render(<App />);
    
    const button = screen.getByRole('button', { name: /ver clima/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Error del servidor')).toBeDefined();
    });
  });

  it('Debe mostrar error cuando fetch falla', async () => {
    globalThis.fetch.mockRejectedValueOnce(new Error('Network error'));

    render(<App />);
    
    const button = screen.getByRole('button', { name: /ver clima/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Error al conectar con el servidor')).toBeDefined();
    });
  });

  it('Debe deshabilitar el boton mientras carga', async () => {
    globalThis.fetch.mockImplementationOnce(() => 
      new Promise(resolve => setTimeout(() => resolve({
        json: async () => ({ temperature: 20, windspeed: 15, condition: 'Test' })
      }), 100))
    );

    render(<App />);
    
    const button = screen.getByRole('button', { name: /ver clima/i });
    fireEvent.click(button);

    expect(screen.getByText('Cargando...')).toBeDefined();
    expect(button.disabled).toBe(true);

    await waitFor(() => {
      expect(screen.getByText('Ver Clima')).toBeDefined();
      expect(button.disabled).toBe(false);
    });
  });
});
