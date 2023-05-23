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
  test('should return an error if any required field is missing', async () => {
    const response = await request(app)
      .post('/api/subscription')
      .send({
        classes: '646538ebcc9f43aa1da9ac9d',
        members: '645f0a6b1c7833a336b2c144',
        // date field is missing
      });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
  test('should return an error if an invalid additional field is provided', async () => {
    const response = await request(app)
      .post('/api/subscription')
      .send({
        classes: '646538ebcc9f43aa1da9ac9d',
        members: '645f0a6b1c7833a336b2c144',
        date: '2023-06-15T00:00:00.000+00:00',
        additionalField: 'extra data',
      });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});

describe('Delete a subscription.', () => {
  test('should delete a subscription and return a success message', async () => {
    const subscription = await Subscription.create(mockSub);
    const response = await request(app)
      .delete(`/api/subscription/${subscription.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Subscription deleted' });
    const deletedSubscription = await Subscription.findById(subscription.id);
    expect(deletedSubscription).toBeNull();
  });

  test('should return an error if subscription has already been deleted', async () => {
    const subscription = await Subscription.create(mockSub);
    await Subscription.findByIdAndDelete(subscription.id);
    const response = await request(app)
      .delete(`/api/subscription/${subscription.id}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('msg', `Subscription with ${subscription.id} not found`);
  });

  test('should return an error if subscription ID is invalid', async () => {
    const invalidId = 'invalid-id';
    const response = await request(app)
      .delete(`/api/subscription/${invalidId}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  test('should return an error if subscription ID does not exist', async () => {
    const nonExistentId = '60b5f15f69b91c22a0249999';
    const response = await request(app)
      .delete(`/api/subscription/${nonExistentId}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('msg', `Subscription with ${nonExistentId} not found`);
  });
});
