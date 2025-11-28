const request = require('supertest');
const server = require('../index');

describe('GET /api/weather', () => {
    afterAll(() => {
        server.close(); // Cerrar servidor tras tests
    });

    it('Debe retornar 400 si faltan parametros', async () => {
        const res = await request(server).get('/api/weather');
        expect(res.statusCode).toEqual(400);
    });
});