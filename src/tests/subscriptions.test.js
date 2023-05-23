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
const mockSubBadId = '6348acd2e1a47ca32e79f46';

beforeAll(async () => {
  await Subscription.collection.insertMany(subsSeed);
  await Class.collection.insertMany(classSeed);
  await Member.collection.insertMany(memberSeed);
});

describe('GET /api/subscription', () => {
  test('Should get all subscriptions', async () => {
    const response = await request(app)
      .get('/api/subscription/');
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
    expect(response.body.data.length).toBe(subsSeed.length);
  });
});

describe('GET /api/subscription/:id', () => {
  test('Should get a subscription searching by ID', async () => {
    const response = await request(app)
      .get(`/api/subscription/${mockSubId}`);
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
    expect(response.body.data.classes).toBe(subsSeed[0].classes);
    expect(response.body.data.members).toBe(subsSeed[0].members);
    expect(response.body.data.date).toBe(subsSeed[0].date);
  });

  test('If ID was wrong should throw a 404', async () => {
    const response = await request(app)
      .get(`/api/subscription/${mockSubMissId}`);
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });

  test('If ID was invalid should throw a 400', async () => {
    const response = await request(app)
      .get(`/api/subscription/${mockSubBadId}`);
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
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
      .put(`/api/subscription/${mockSubBadId}`)
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
