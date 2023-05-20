import request from 'supertest';
import app from '../app';
import Trainer from '../models/Trainer';
import seedTrainer from '../seeds/trainers';

// const mockTrainer = {
//   firstName: 'Dwight',
//   lastName: 'Schrute',
//   dni: '32532102',
//   phone: '7697649050',
//   email: 'dwightk@nifty.com',
//   password: '3p8s8R3KdW',
//   salary: '$80090.27',
//   isActive: true,
// };

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
