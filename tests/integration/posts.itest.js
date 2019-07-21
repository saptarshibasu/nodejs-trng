const request = require('supertest');

let server;

describe('Posts Endpoints', () => {

    beforeEach(() => { server = require('../../index'); });
    afterEach(() => { server.close(); });

    it('should return posts', async () => {
        const res = await request(server).get('/api/posts');
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(100);
    });

});