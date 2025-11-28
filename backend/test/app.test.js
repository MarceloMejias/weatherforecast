const request = require('supertest');
const server = require('../index');

describe('GET /api/weather', () => {
    afterAll(() => {
        server.close();
    });

    it('Debe retornar 400 si faltan parametros', async () => {
        const res = await request(server).get('/api/weather');
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error');
    });

    it('Debe retornar datos del clima correctamente', async () => {
        const res = await request(server).get('/api/weather?lat=-33.44&lon=-70.66');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('temperature');
        expect(res.body).toHaveProperty('windspeed');
        expect(res.body).toHaveProperty('condition');
    }, 10000);

    it('Debe retornar 400 si falta latitud', async () => {
        const res = await request(server).get('/api/weather?lon=-70.66');
        expect(res.statusCode).toEqual(400);
    });

    it('Debe retornar 400 si falta longitud', async () => {
        const res = await request(server).get('/api/weather?lat=-33.44');
        expect(res.statusCode).toEqual(400);
    });
});

