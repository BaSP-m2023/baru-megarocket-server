import request from 'supertest';
import app from '../app';
import Trainer from '../models/Trainer';
import seedTrainer from '../seeds/trainers';

const mockTrainer = {
  firstName: 'Dwight',
  lastName: 'Schrute',
  dni: '32532102',
  phone: '7697649050',
  email: 'dwightk@nifty.com',
  password: '3p8s8R3KdW',
  salary: '$85000.43',
  isActive: true,
};

beforeAll(async () => {
  await Trainer.collection.insertMany(seedTrainer);
}, 10000);

describe('GET /api/trainer', () => {
  test('should return status 200', async () => {
    const response = await request(app).get('/api/trainer').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });

  test('should return status 404', async () => {
    const response = await request(app).get('/api/trainers').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });

  test('Trainers lenght should be the same as the DB', async () => {
    const response = await request(app).get('/api/trainer').send();
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(seedTrainer.length);
  });
});

describe('POST /api/trainer', () => {
  test('create a trainer should return status 201', async () => {
    const response = await request(app).post('/api/trainer').send(mockTrainer);
    expect(response.status).toBe(201);
    expect(response.error).toBeFalsy();
  });

  test('should return status 404', async () => {
    const response = await request(app).post('/api/trainers').send(mockTrainer);
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });

  test('should have all the required fields', async () => {
    const response = await request(app).post('/api/trainer').send(mockTrainer);
    expect(response.body.data).toHaveProperty('firstName');
    expect(response.body.data).toHaveProperty('lastName');
    expect(response.body.data).toHaveProperty('dni');
    expect(response.body.data).toHaveProperty('email');
    expect(response.body.data).toHaveProperty('password');
  });

  test('fields length should be between its defined maximum and minimum chars length', async () => {
    const response = await request(app).post('/api/trainer').send(mockTrainer);

    expect(response.body.data.firstName.length).toBeGreaterThanOrEqual(3);
    expect(response.body.data.firstName.length).toBeLessThanOrEqual(20);

    expect(response.body.data.lastName.length).toBeGreaterThanOrEqual(3);
    expect(response.body.data.lastName.length).toBeLessThanOrEqual(20);

    expect(response.body.data.dni.length).toBeGreaterThanOrEqual(8);
    expect(response.body.data.dni.length).toBeLessThanOrEqual(10);

    expect(response.body.data.phone.length).toBeGreaterThanOrEqual(10);
    expect(response.body.data.phone.length).toBeLessThanOrEqual(12);

    expect(response.body.data.password.length).toBeGreaterThanOrEqual(8);
    expect(response.body.data.password.length).toBeLessThanOrEqual(20);
  });

  test('', async () => {

  });
});
