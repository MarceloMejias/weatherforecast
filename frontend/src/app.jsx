import React, { useState } from 'react';
import './App.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
        // Coordenadas fijas para Viña del Mar, Chile
      const res = await fetch('http://localhost:3001/api/weather?lat=-33.02&lon=-71.55');
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setWeather(data);
      }
    } catch (e) {
      setError('Error al conectar con el servidor');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>🌤️ Weather Forecast</h1>
      <p className="subtitle">Viña del Mar, Chile</p>
      
      <button onClick={fetchWeather} disabled={loading}>
        {loading ? '⏳ Cargando...' : '🔍 Ver Clima'}
      </button>
      
      {error && (
        <div className="error">
          ⚠️ {error}
        </div>
      )}
      
      {weather && (
        <div className="weather-info">
          <div className="weather-card">
            <div className="temperature">
              {weather.temperature}°C
            </div>
            <div className="weather-detail">
              <span className="icon">💨</span>
              <span>Viento: {weather.windspeed} km/h</span>
            </div>
            <div className="weather-detail">
              <span className="icon">🌡️</span>
              <span>Código: {weather.condition}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default App;