/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import app from '../app';
import Class from '../models/Class';
import classSeed from '../seeds/classes';

beforeAll(async () => {
  await Class.collection.insertMany(classSeed);
});

const mockClass = {
  activity: '647e76a0a6fe412c47147ab7',
  day: 'Friday',
  time: '20:00',
  trainer: '6480a02325ed27c6d94bb1b0',
  capacity: 3,
};
describe('GET all class /api/class', () => {
  test('should return status 200', async () => {
    const response = await request(app).get('/api/class/search').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('should return status 200', async () => {
    const response = await request(app).get('/api/class/search/?day=Monday');
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('should return status 404', async () => {
    const response = await request(app).get('/api/class').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
});

describe('Create class /api/class/', () => {
  test('Should create a class with status 201', async () => {
    const response = await request(app).post('/api/class').send(mockClass);
    expect(response.status).toBe(201);
    expect(response.error).toBeFalsy();
    expect(response.body).toBeDefined();
    expect(response.body.data.trainer).toBeDefined();
    expect(response.body.data.activity).toBeDefined();
    expect(response.body.data.day).toBeDefined();
    expect(response.body.data.time).toBeDefined();
    expect(response.body.data.capacity).toBeDefined();
  });
  test('should return status 404', async () => {
    const response = await request(app).post('/api/classs').send(mockClass);
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
});

describe('GET class by ID /api/class/:id', () => {
  test('should return status 200', async () => {
    const response = await request(app).get('/api/class/6462ea9abb5168b3bbbc8bc0');
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('should return an existing class', async () => {
    const response = await request(app).get('/api/class/6462ea9abb5168b3bbbc8bc0').send();
    const classId = response.body.data;
    expect(classId).toBeDefined();
  });
  test('should return status 404', async () => {
    const response = await request(app).get('/api/class/12312212312312212').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
});

describe('Delete class by id api/class/delete/:id', () => {
  test('on good request return status 200 - "delete" property change false for true', async () => {
    const response = await request(app).delete(`/api/class/delete/${classSeed[0]._id}`).send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('when does not exists return status 404', async () => {
    const response = await request(app).delete(`/api/class/delete/${classSeed[0]._id}`).send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('on bad request return status 400', async () => {
    const response = await request(app).delete('/api/class/delete/lalalalalalaa').send();
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
});

describe('PUT update by id api/class/:id', () => {
  test('return status 200 - error false - updates only the passed props', async () => {
    const classBefore = classSeed[0];
    const classAfter = await request(app).put(`/api/class/${classSeed[1]._id}`).send({ trainer: classBefore.trainer._id });
    expect(classAfter.status).toBe(200);
    expect(classAfter.error).toBeFalsy();
    expect(classAfter._body.data.day).toBe(classBefore.day);
  });
  test('on bad request return status 404', async () => {
    const response = await request(app).put(`/api/class/${classSeed[0]._id}`).send({ trainer: classSeed[1].activity._id });
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('throws bad request when try to change "deleted" prop', async () => {
    const response = await request(app).put(`/api/class/${classSeed[0]._id}`).send({ deleted: true });
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
    expect(response._body.message).toBe('There was an error "deleted" is not allowed');
  });
  test('if do not meets the length validation throws error', async () => {
    const response = await request(app).put(`/api/class/${classSeed[0]._id}`).send({ activity: 'aaaaaaaaa123' });
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
  test('if do not meets the data type validation throws error', async () => {
    const response = await request(app).put(`/api/class/${classSeed[0]._id}`).send({ time: 'lalala' });
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
});
