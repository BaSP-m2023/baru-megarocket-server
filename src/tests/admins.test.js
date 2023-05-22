import request from 'supertest';
import app from '../app';
import Admin from '../models/Admin';
import adminSeed from '../seeds/admins';

beforeAll(async () => {
  await Admin.collection.insertMany(adminSeed);
}, 30000000);

const mockAdmin = {
  firstName: 'Carlos',
  lastName: 'Rodriguez',
  dni: 38790908,
  phone: 1128449713,
  email: 'rodriguezj@gmail.com',
  city: 'Cordoba',
  password: 'Password1',
};

const missingFields = {
  firstName: 'Rodrigo',
  lastName: 'Jimenez',
};

const errorDataAdmin = {
  firstName: 'Juan   ',
  lastName: 'Gonzalez',
  dni: 38790908,
  phone: 1128779713,
  email: 'gonzalezJ@gmail.com',
  city: 'Caseros',
  password: 'locd34pssD',
};

// const emptyAdmin = {};

describe('POST /api/admins/', () => {
  test('Should return status 201 when create a admin succsessfully', async () => {
    const response = await request(app).post('/api/admins').send(mockAdmin);
    expect(response.status).toBe(201);
    expect(response.error).toBeFalsy();
  });

  test('Should return status 404 when the route is wrong', async () => {
    const response = await request(app).post('/api/admin').send(mockAdmin);
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });

  test('Should return a status 400 when have missing data', async () => {
    const response = await request(app).post('/api/admins').send(missingFields);
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });

  test('Should return status 400 when de data is invalid', async () => {
    const response = await request(app).post('/api/admins').send(errorDataAdmin);
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });

  describe('PUT DELETE /api/admins/delete/:id', () => {
    test('Should return status 200 when "deleted" flag turn on true', async () => {
      const correctId = '6462d38b2118b6d63daf41f1';
      const response = await request(app).delete(`/api/admins/delete/${correctId}`);
      expect(response.status).toBe(200);
      expect(response.body.deleted).toBe(true);
    });

    test('Should return status 404 when the route is wrong', async () => {
      const correctId = '6462d38b2118b6d63daf41f5';
      const response = await request(app).delete(`/api/admin/delete/${correctId}`);
      expect(response.status).toBe(404);
      expect(response.error).toBeTruthy();
    });

    test('Should return status 404 when the admin has been deleted', async () => {
      const adminDeleted = '6462d3e42118b6d63daf41f4';
      const response = await request(app).delete(`/api/admins/delete/${adminDeleted}`);
      expect(response.status).toBe(404);
      expect(response.error).toBeTruthy();
    });

    test('Should return status 404 when the admin is not found', async () => {
      const incorrectId = '6462d38b2118b6d63daf41f5';
      const response = await request(app).delete(`/api/admins/delete/${incorrectId}`);
      expect(response.status).toBe(404);
      expect(response.error).toBeTruthy();
    });
  });

  describe('PUT RECOVER /api/admins/recoverAdmin/:id', () => {
    test('Should return status 200 when "deleted" flag turn on false', async () => {
      const correctId = '6462d38b2118b6d63daf41f9';
      const response = await request(app).put(`/api/admins/recoverAdmin/${correctId}`);
      expect(response.status).toBe(200);
      expect(response.body.deleted).toBe(false);
      expect(response.error).toBeFalsy();
    });

    test('Should return status 404 when the route is wrong', async () => {
      const correctId = '6462d38b2118b6d63daf41f9';
      const response = await request(app).put(`/api/admin/recoverAdmin/${correctId}`);
      expect(response.status).toBe(404);
      expect(response.error).toBeTruthy();
    });

    test('Should return status 404 when the admin has been deleted', async () => {
      const adminDeleted = '6462d3e42118b6d63daf41f9';
      const response = await request(app).put(`/api/admins/recoverAdmin/${adminDeleted}`);
      expect(response.status).toBe(404);
      expect(response.error).toBeTruthy();
    });

    test('Should return status 404 when the admin is not found', async () => {
      const incorrectId = '6462d38b2118b6d63daf41f5';
      const response = await request(app).put(`/api/admins/recoverAdmin/${incorrectId}`);
      expect(response.status).toBe(404);
      expect(response.error).toBeTruthy();
    });
  });
});
