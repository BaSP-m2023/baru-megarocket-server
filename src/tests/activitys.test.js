/* eslint-disable no-underscore-dangle */
/* eslint-disable eol-last */
import request from 'supertest';
import app from '../app';
import Activity from '../models/Activity';
import activitySeed from '../seeds/activitys';

const mockActivity = {
  name: 'Crossfit',
  description: 'A type of strength training that readies your body for daily activities',
  isActive: false,
};
const mockActivityWrong = {
  name: 'Judo2',
  description: 'A type of strength training that readies your body for daily activities',
  isActive: false,
};
const mockActivityMiss = {
  description: 'A type of strength training that readies your body for daily activities',
  isActive: false,
};

beforeAll(async () => {
  await Activity.collection.insertMany(activitySeed);
});

describe('PUT logic by id api/activity/:id', () => {
  test('on edit throw good request 200', async () => {
    const response = await request(app).put('/api/activity/6465286dad795d0bf31704f8').send(mockActivity);
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('when does not exists return status 404', async () => {
    const response = await request(app).put('/api/activity/6465286dad795d0bf31704f4').send(mockActivity);
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('wrong id return the 400', async () => {
    const response = await request(app).put('/api/activity/6465286dad795d0bf31704f').send(mockActivity);
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
  test('data invalid return the 400', async () => {
    const response = await request(app).put('/api/activity/6465286dad795d0bf31704f8').send(mockActivityWrong);
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
  test('missing files return 400', async () => {
    const response = await request(app).put('/api/activity/6465286dad795d0bf31704f8').send(mockActivityMiss);
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
});

describe('DELETE logic by id api/activity/:id', () => {
  test('on delete throw good request 200', async () => {
    const response = await request(app).delete('/api/activity/6465286dad795d0bf31704f8');
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('when does not exists return status 404', async () => {
    const response = await request(app).delete('/api/activity/6365286dad795d0bf31704f8');
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('wrong id return the 400', async () => {
    const response = await request(app).delete('/api/activity/6465286dad795d0bf31704f');
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
});
