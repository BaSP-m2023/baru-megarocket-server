import request from 'supertest';
import app from '../app';
import SuperAdmin from '../models/SuperAdmin';
import superAdminSeed from '../seeds/super-admins';

beforeAll(async () => {
  await SuperAdmin.collection.insertMany(superAdminSeed);
});
// eslint-disable-next-line no-underscore-dangle
const existId = superAdminSeed[0]._id;
const mockSuperAdmin = {
  name: 'Keith',
  lastName: 'Richards',
  email: 'keithrich@stones.com',
  password: 'R1ooT42SSa',
};
const mockName = mockSuperAdmin.name;

describe('Get all super admins tests ', () => {
  test('In a good request the response status should be 200', async () => {
    const response = await request(app).get('/api/super-admins/').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
    expect(response.body.error).toBeFalsy();
  });
  test('In a good request should return full super admins list', async () => {
    const response = await request(app).get('/api/super-admins/').send();
    expect(response.body.message).toBeDefined();
    expect(response.body.data.length).toEqual(superAdminSeed.length);
    expect(response.body.error).toBeFalsy();
  });
});

describe('Get super admins by Id tests', () => {
  test('In a good request the response status should be 200', async () => {
    const response = await request(app).get(`/api/super-admins/${existId}`).send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
    expect(response.body.error).toBeFalsy();
  });
  test('In a bad request the response status should be 400', async () => {
    const response = await request(app).get('/api/super-admins/6ggerger34').send();
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
    expect(response.body.error).toBeTruthy();
  });
  test('When the ID is not found, the response status should be 404', async () => {
    const response = await request(app).get('/api/super-admins/64649c885078b9c723c68355').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
    expect(response.body.error).toBeTruthy();
  });
  test('Check if response super admin should match the requested super admin', async () => {
    const response = await request(app).get(`/api/super-admins/${existId}`).send();
    // eslint-disable-next-line no-underscore-dangle
    expect(response.body.data._id).toEqual(existId.valueOf());
  });
});

describe('Post super admins tests', () => {
  test('If eh super admin was created status should be 201', async () => {
    const response = await request(app).post('/api/super-admins').send(mockSuperAdmin);
    expect(response.status).toBe(201);
    expect(response.error).toBeFalsy();
    expect(response.body.message).toMatch('Super Admin created');
    expect(response.body.error).toBeFalsy();
  });
  test('Check if the super admin it´s added to the list', async () => {
    const response = await request(app).get('/api/super-admins').send();
    expect(response.body.data.length).toEqual(superAdminSeed.length + 1);
  });
  test('If one field is missing status should be 400', async () => {
    const response = await request(app).post('/api/super-admins').send({ name: 'Ronnie', lastName: 'Wood' });
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
    expect(response.body.error).toBeTruthy();
  });
  test('If one field is wrong status should be 400', async () => {
    const response = await request(app).post('/api/super-admins').send({
      name: 'Ronnie', lastName: 'Wood', email: 'dsaasd', password: 'ddERass88',
    });
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
    expect(response.body.error).toBeTruthy();
  });
});

describe('Put super admins tests', () => {
  test('In a good request the response status should be 200', async () => {
    const response = await request(app).put(`/api/super-admins/${existId}`).send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
    expect(response.body.error).toBeFalsy();
  });
  test('When a field has edited the response status should be 200', async () => {
    const response = await request(app).put(`/api/super-admins/${existId}`).send({ name: 'Charlie' });
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
    expect(response.body.error).toBeFalsy();
  });
  test('Check if the field was edited', async () => {
    const response = await request(app).get(`/api/super-admins/${existId}`).send();
    expect(response.body.data.name).not.toEqual(mockName);
  });
  test('If one of the edited fields is wrong status should be 400', async () => {
    const response = await request(app).put(`/api/super-admins/${existId}`).send({ password: 'ddERas' });
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
    expect(response.body.error).toBeTruthy();
  });
  test('When the ID is not found, the response status should be 404', async () => {
    const response = await request(app).put('/api/super-admins/64649c885078b9c723c68355').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
    expect(response.body.error).toBeTruthy();
  });
});

describe('Delete super admins tests', () => {
  test('In a good request the response status should be 204', async () => {
    const response = await request(app).delete(`/api/super-admins/${existId}`).send();
    expect(response.status).toBe(204);
    expect(response.error).toBeFalsy();
    expect(response.body.error).toBeFalsy();
  });
  test('Searching for the deleted ID, the response status should be 404', async () => {
    const response = await request(app).delete(`/api/super-admins/${existId}`).send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
    expect(response.body.error).toBeTruthy();
  });
  test('When the ID is not found, the response status should be 404', async () => {
    const response = await request(app).delete('/api/super-admins/64649c885078b9c723c68355').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
    expect(response.body.error).toBeTruthy();
  });
  test('In a bad request the response status should be 400', async () => {
    const response = await request(app).delete('/api/super-admins/6ggerger34').send();
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
    expect(response.body.error).toBeTruthy();
  });
});
