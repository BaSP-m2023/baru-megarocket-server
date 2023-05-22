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
});
