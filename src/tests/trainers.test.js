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
  salary: '85000',
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

  test('fields must have a valid format', async () => {
    const response = await request(app).post('/api/trainer').send(mockTrainer);

    expect(response.body.data.firstName).toMatch((/^[a-zA-Z\s]+$/));

    expect(response.body.data.lastName).toMatch((/^[a-zA-Z\s]+$/));

    expect(response.body.data.dni).toMatch((/^\d+$/));

    if (response.body.data.phone) {
      expect(response.body.data.phone).toMatch((/^\d+$/));
    }

    expect(response.body.data.email).toMatch(/^[\w.-]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+$/);

    expect(response.body.data.password).toMatch((/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/));

    if (response.body.data.salary) {
      expect(response.body.data.salary).toMatch((/^[0-9]+$/));
    }
  });
});

describe('PUT /api/trainer/:id', () => {
  test('update trainer should return status 200', async () => {
    const response = await request(app).put('/api/trainer/646f10810596acb1db833e25').send(mockTrainer);
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });

  test('should return status 404', async () => {
    const response = await request(app).put('/api/trainer/646f10810596acb1db833e28').send(mockTrainer);
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });

  test('fields length should be between its defined maximum and minimum chars length', async () => {
    const response = await request(app).put('/api/trainer/646f10810596acb1db833e25').send({ firstName: 'Rolando' });

    if (response.body.data.firstName) {
      expect(response.body.data.firstName.length).toBeGreaterThanOrEqual(3);
      expect(response.body.data.firstName.length).toBeLessThanOrEqual(20);
    }

    if (response.body.data.lastName) {
      expect(response.body.data.lastName.length).toBeGreaterThanOrEqual(3);
      expect(response.body.data.lastName.length).toBeLessThanOrEqual(20);
    }

    if (response.body.data.dni) {
      expect(response.body.data.dni.length).toBeGreaterThanOrEqual(8);
      expect(response.body.data.dni.length).toBeLessThanOrEqual(10);
    }

    if (response.body.data.phone) {
      expect(response.body.data.phone.length).toBeGreaterThanOrEqual(10);
      expect(response.body.data.phone.length).toBeLessThanOrEqual(12);
    }

    if (response.body.data.password) {
      expect(response.body.data.password.length).toBeGreaterThanOrEqual(8);
      expect(response.body.data.password.length).toBeLessThanOrEqual(20);
    }
  });
  describe('get by ID /api /trainer', () => {
    test('should return status 200', async () => {
      const response = await request(app).get('/api/trainer/646f10810596acb1db833e25').send();
      expect(response.status).toBe(200);
      expect(response.error).toBeFalsy();
    });
    test('should return trainer that exist', async () => {
      const response = await request(app).get('/api/trainer/646f10810596acb1db833e25').send();
      const trainer = response.body.data;
      expect(trainer).toBeDefined();
    });
    test('should return status 404 when the trainer is not found', async () => {
      const response = await request(app).get('/api/trainer/646f10810596acb1db633e25').send();
      expect(response.status).toBe(404);
      expect(response.error).toBeTruthy();
    });
  });
  describe('delete by ID /api /trainer', () => {
    test('should return status 200 when the trainer is deleted correctly', async () => {
      const response = await request(app).delete('/api/trainer/646f10810596acb1db833e25').send();
      expect(response.status).toBe(200);
      expect(response.error).toBeFalsy();
    });
    test('should return status 404 when the trainer is not found', async () => {
      const response = await request(app).delete('/api/trainer/646f10810596acb1db873e25').send();
      expect(response.status).toBe(404);
      expect(response.error).toBeTruthy();
    });
  });
});
