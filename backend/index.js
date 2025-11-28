const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

// Endpoint principal
app.get('/api/weather', async (req, res) => {
    const { lat, lon } = req.query;
    
    if (!lat || !lon) {
        return res.status(400).json({ error: 'Latitud y Longitud requeridas' });
    }

    try {
        // Consumimos la API pública de Open-Meteo
        const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        res.json({
            temperature: response.data.current_weather.temperature,
            windspeed: response.data.current_weather.windspeed,
            condition: response.data.current_weather.weathercode
        });
    } catch (error) {
        console.error('Error consultando servicio externo:', error.message);
        res.status(500).json({ 
            error: 'Error consultando servicio externo',
            details: error.message 
        });
    }
});

const PORT = process.env.PORT || 3001;
// Exportamos server para testing
const server = app.listen(PORT, () => {
    console.log(`Backend corriendo en puerto ${PORT}`);
});

module.exports = server;