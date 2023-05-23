import request from 'supertest';
import app from '../app';
import Subscription from '../models/Subscription';
import subsSeed from '../seeds/subscriptions';
import Class from '../models/Class';
import classSeed from '../seeds/classes';
import Member from '../models/Member';
import memberSeed from '../seeds/members';

const mockSub = {
  classes: '6462ea9abb5168b3bbbc8bc0',
  members: '646f10810596acb1db833e25',
  date: '2023-10-15T00:00:00.000+00:00',
};

beforeAll(async () => {
  await Subscription.collection.insertMany(subsSeed);
  await Class.collection.insertMany(classSeed);
  await Member.collection.insertMany(memberSeed);
});

describe('Create a subscription.', () => {
  test('should create a subscription with status 201', async () => {
    const response = await request(app)
      .post('/api/subscription')
      .send(mockSub);
    console.log(response.body);
    expect(response.status).toBe(201);
  });
  test('should return an error if classes ID is invalid', async () => {
    const response = await request(app)
      .post('/api/subscription')
      .send({
        classes: '646538ebcc9f43',
        members: '645f0a6b1c7833a336b2c144',
        date: '2023-06-15T00:00:00.000+00:00',
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
  test('should return an error if members ID is invalid', async () => {
    const response = await request(app)
      .post('/api/subscription')
      .send({
        classes: '646538ebcc9f43aa1da9ac9d',
        members: '123456789',
        date: '2023-06-15T00:00:00.000+00:00',
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});
