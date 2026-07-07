const request = require('supertest');
const app = require('./index');

describe('zen-demo-app', () => {
  it('returns 200 on /healthz', async () => {
    const res = await request(app).get('/healthz');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  it('returns 200 on /', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/zen-demo-app/);
  });
});
