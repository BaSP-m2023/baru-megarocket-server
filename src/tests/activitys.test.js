/* eslint-disable no-underscore-dangle */
/* eslint-disable eol-last */
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import Activity from '../models/Activity';
import activitySeed from '../seeds/activitys';
import Trainer from '../models/Trainer';
import trainersSeed from '../seeds/trainers';

const mockActivity = {
  name: 'Crossfit',
  description: 'A type of strength training that readies your body for daily activities',
  isActive: false,
  trainers: [
    new mongoose.Types.ObjectId('6460763768fd665d7bf97f13'),
  ],
};

const mockActivityWrong = {
  name: 'Judo2',
  description: 'A type of strength training that readies your body for daily activities',
  isActive: false,
  trainers: [
    new mongoose.Types.ObjectId('6460763768fd665d7bf97f13'),
  ],
};

const mockActivityMiss = {
  description: 'A type of strength training that readies your body for daily activities',
  isActive: false,
};

beforeAll(async () => {
  await Trainer.collection.insertMany(trainersSeed);
  await Activity.collection.insertMany(activitySeed);
});

describe('PUT logic by id api/activity/:id', () => {
  test('on edit throw good request 200', async () => {
    const response = await request(app).put('/api/activities/6465286dad795d0bf31704f8').send(mockActivity);
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('when does not exists return status 404', async () => {
    const response = await request(app).put('/api/activities/6465286dad795d0bf31704f4').send(mockActivity);
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('wrong id return the 400', async () => {
    const response = await request(app).put('/api/activities/6465286dad795d0bf31704f').send(mockActivity);
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
  test('data invalid return the 400', async () => {
    const response = await request(app).put('/api/activities/6465286dad795d0bf31704f8').send(mockActivityWrong);
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
});

describe('GET all activity /api/activities', () => {
  test('should return status 200', async () => {
    const response = await request(app).get('/api/activities').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('should return status 404', async () => {
    const response = await request(app).get('/api/activity').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('should return all activities', async () => {
    const response = await request(app).get('/api/activities').send();
    expect(response.body.data.length).toBe(2);
  });
  test('should return all the activities with their trainers', async () => {
    const response = await request(app).get('/api/activities').send();
    expect(response.body.data[1].trainers.length).toBe(2);
  });
});

describe('GET by id /api/activities/:id', () => {
  test('should return status 200', async () => {
    const response = await request(app).get('/api/activities/6465286dad795d0bf31704f8').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('should return an activity that exists ', async () => {
    const response = await request(app).get('/api/activities/6465286dad795d0bf31794f8').send();
    const activity = response.body.data;
    expect(activity).toBeDefined();
  });
  test('should return all the activities with their trainers', async () => {
    const response = await request(app).get('/api/activities/6465286dad795d0bf31794f8').send();
    expect(response.body.data.trainers.length).toBe(2);
  });
});

describe('DELETE logic by id api/activity/:id', () => {
  test('on delete throw good request 200', async () => {
    const response = await request(app).delete('/api/activities/6465286dad795d0bf31704f8');
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('when does not exists return status 404', async () => {
    const response = await request(app).delete('/api/activities/6365286dad795d0bf31704f8');
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('wrong id return the 400', async () => {
    const response = await request(app).delete('/api/activities/6465286dad795d0bf31704f');
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
});

describe('POST activity /api/activities/', () => {
  test('should create an activity with status 201', async () => {
    const response = await request(app).post('/api/activities/').send(mockActivity);
    expect(response.status).toBe(201);
    expect(response.error).toBeFalsy();
  });
  test('should have a valid name and description', async () => {
    const response = await request(app).post('/api/activities/').send(mockActivity);
    expect(response.body.data.name).toMatch(/^[A-Za-z\s]+$/);
    expect(response.body.data.description).toMatch(/^[A-Za-z\s]+$/);
  });
  test('should have at least one trainer for the activity', async () => {
    const response = await request(app).post('/api/activities/').send(mockActivity);
    expect(response.body.data.trainers.length).toBeGreaterThanOrEqual(0);
    expect(response.body.error).toBeFalsy();
    expect(response.status).toBe(201);
  });
  test('fields length should be between its defined maximum and minimum chars length', async () => {
    const response = await request(app).post('/api/activities/').send(mockActivity);
    expect(response.body.data.name.length).toBeGreaterThanOrEqual(4);
    expect(response.body.data.name.length).toBeLessThanOrEqual(20);
    expect(response.body.data.description.length).toBeGreaterThanOrEqual(5);
    expect(response.body.data.description.length).toBeLessThanOrEqual(100);
  });
  test('missing files return 404', async () => {
    const response = await request(app).post('/api/activities/6465286dad795d0bf31704f8').send(mockActivityMiss);
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
});
