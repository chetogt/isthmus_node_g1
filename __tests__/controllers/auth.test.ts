import { close } from 'inspector';
import request from 'supertest';
import app from '../../src/app';
import { connect, closeDatabase } from '../../src/repositories/__mocks__/db_handler';

jest.setTimeout(30000);

let server: any = null;
let agent: any = null;

describe('Security', () => {
  beforeAll(async (done) => {
    await connect();
    server = app
      .listen(3001, () => {
        agent = request.agent(server);
        done();
      }).on('error', (err) => {
        done(err);
      });
  });

  it('should create a new user', async () => {
    const res = await request(app).post('/v1/users').send({
      "name": "Test User",
      "email": "test@email.com",
      "password": "p123"
    });
    expect(res.status).toEqual(200);
  });

  it('should login user', async () => {
    const res = await request(app).post('/v1/auth').send({
      "email": "test@email.com",
      "password": "p123"
    });
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('token');
    expect(typeof res.body.token).toEqual('string');
    expect(res.body.token.length).toBeGreaterThanOrEqual(1);
  });

  it('login error credentials', async () => {
    const res = await request(app).post('/v1/auth').send({
      "email": "test@email.com",
      "password": "p123344"
    });
    expect(res.status).toEqual(400);
    expect(typeof res.body.message).toEqual('string');
    expect(res.body.message).toEqual('Invalid credentials');
  });

  it('login error user', async () => {
    const res = await request(app).post('/v1/auth').send({
      "email": "tests@email.com",
      "password": "p123344"
    });
    expect(res.status).toEqual(400);
    expect(typeof res.body.message).toEqual('string');
    expect(res.body.message).toEqual('Invalid user');
  });

  it('login server error', async () => {
    closeDatabase();
    const res = await request(app).post('/v1/auth').send({
      "email": "tests@email.com",
      "password": "p123344"
    });
    expect(res.status).toEqual(500);
  })

  afterAll(async () => {
    await closeDatabase();
  });
});