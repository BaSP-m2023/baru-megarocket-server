import request from 'supertest';
import app from '../app';
import SuperAdmin from '../models/SuperAdmin';
import superAdminSeed from '../seeds/super-admins';

beforeAll(async () => {
  await SuperAdmin.collection.insertMany(superAdminSeed);
});

describe('Get all super admins tests ', () => {
  test('On good request should return status 200', async () => {
    const response = await request(app).get('/api/super-admins/').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('On good request should return full super admins list', async () => {
    const response = await request(app).get('/api/super-admins/').send();
    expect(response.body.data.length).toEqual(superAdminSeed.length);
  });
});
