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

const mockBadIdSub = {
  classes: '646538ebcc9f43aa1da9ac9',
  members: '646f10810596acb1db833e25',
  date: '2023-10-15T00:00:00.000+00:00',
};

const mockBadDateSub = {
  classes: '646538ebcc9f43aa1da9ac9e',
  members: '646f10810596acb1db833e25',
  date: '2023-38-15T00:00:00.000+00:00',
};

const mockBadFieldSub = {
  classe: '646538ebcc9f43aa1da9ac9e',
  members: '646f10810596acb1db833e25',
  date: '2023-10-15T00:00:00.000+00:00',
};

const mockMissFieldSub = {
  members: '646f10810596acb1db833e25',
  date: '2023-10-15T00:00:00.000+00:00',
};

/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
const mockSubId = subsSeed[0]._id;

const mockSubMissId = '6348acd2e1a47ca32e79f46e';

beforeAll(async () => {
  await Subscription.collection.insertMany(subsSeed);
  await Class.collection.insertMany(classSeed);
  await Member.collection.insertMany(memberSeed);
});

describe('PUT /api/subscription', () => {
  test('Should modify a subscription', async () => {
    const response = await request(app)
      .put(`/api/subscription/${mockSubId}`)
      .send(mockSub);
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });

  test('Bad ID should throw status 400', async () => {
    const response = await request(app)
      .put(`/api/subscription/${mockBadIdSub}`)
      .send(mockSub);
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });

  test('Bad class ID should throw status 400', async () => {
    const response = await request(app)
      .put(`/api/subscription/${mockSubId}`)
      .send(mockBadFieldSub);
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });

  test('Bad date should throw status 400', async () => {
    const response = await request(app)
      .put(`/api/subscription/${mockSubId}`)
      .send(mockBadDateSub);
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });

  test('Missed field should throw status 200', async () => {
    const response = await request(app)
      .put(`/api/subscription/${mockSubId}`)
      .send(mockMissFieldSub);
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });

  test('Wrong ID should throw status 404', async () => {
    const response = await request(app)
      .put(`/api/subscription/${mockSubMissId}`)
      .send(mockSub);
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
});
