import request from 'supertest';
import app from '../app';
import Activity from '../models/Activity';
import activitySeed from '../seeds/activitys';

const mockActivity = {
  name: 'Functional',
  description: 'A type of strength training that readies your body for daily activities.',
  isActive: false,
};

beforeAll(async () => {
  await Activity.collection.insertMany(activitySeed);
});

describe('GET /api/activity', () => {
  test('should return status 200', async () => {
    const response = await request(app).get('/api/activity').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('should return status 404', async () => {
    const response = await request(app).get('/api/activities').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
});

describe('GET all activity /api/activity', () => {
  test('should return status 200', async () => {
    const response = await request(app).get('/api/activity').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('should return status 404', async () => {
    const response = await request(app).get('/api/activities').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('should return all activities', async () => {
    const response = await request(app).get('/api/activity').send();
    expect(response.body.length).toBe(2);
  });
});

describe('GET by id /api/activity/:id', () => {
  test('should return status 200', async () => {
    const response = await request(app).get('/api/activity/6465286dad795d0bf31704f8').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('should return an activity that exists ', async () => {
    const response = await request(app).get('/api/activity/6465286dad795d0bf31794f8').send();
    const activity = response.body.data;
    expect(activity).toBeDefined();
  });
});

describe('POST activity /api/activity/', () => {
  test('should create an activity with status 201', async () => {
    const response = await request(app).post('/api/activity/').send(mockActivity);
    expect(response.status).toBe(201);
    expect(response.error).toBeFalsy();
  });
  test('should have a valid name ans description', async () => {
    const response = await request(app).post('/api/activity/').send(mockActivity);
    expect(response.body.name).toMatch(/^[a-zA-Z]+$/);
  });
});
