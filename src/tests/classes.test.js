/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import app from '../app';
import Class from '../models/Class';
import classSeed from '../seeds/classes';

beforeAll(async () => {
  await Class.collection.insertMany(classSeed);
});

const mockClass = {
  activity: '6465286dad795d0bf31704f1',
  trainer: ['6460763768fd665d7bf97f13', '646076aa68fd665d7bf97f1b'],
  day: 'Tuesday',
  time: '20:00',
  capacity: 20,
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
    expect(response.body.trainer).toBeDefined();
    expect(response.body.activity).toBeDefined();
    expect(response.body.day).toBeDefined();
    expect(response.body.time).toBeDefined();
    expect(response.body.capacity).toBeDefined();
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

describe('PUT logic delete by id api/class/delete/:id', () => {
  test('on good request return status 200 - "delete" property change false for true', async () => {
    const response = await request(app).put(`/api/class/delete/${classSeed[0]._id}`).send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
    expect(response._body.deleted_class.deleted).toBe(true);
  });
  test('when does not exists return status 404', async () => {
    const response = await request(app).put(`/api/class/delete/${classSeed[0]._id}`).send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('on bad request return status 400', async () => {
    const response = await request(app).put('/api/class/delete/lalalalalalaa').send();
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
  test('deleted object is restored', async () => {
    const restore = await request(app).put(`/api/class/restore/${classSeed[0]._id}`).send();
    expect(restore._body.restored_class.deleted).toBe(false);
  });
});

describe('PUT update by id api/class/:id', () => {
  test('return status 200 - error false - updates only the passed props', async () => {
    const classBefore = classSeed[1];
    const classAfter = await request(app).put(`/api/class/${classSeed[0]._id}`).send({ trainer: classSeed[1].trainer._id });
    expect(classAfter.status).toBe(200);
    expect(classAfter.error).toBeFalsy();
    expect(classAfter._body.class.day).toBe(classBefore.day);
  });
  test('when does not exists return status 404', async () => {
    const response = await request(app).put('/api/class/6462ea9abb5168b3bbbc8bc5').send({ trainer: classSeed[1].trainer._id });
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('on bad request return status 400', async () => {
    const response = await request(app).put(`/api/class/${classSeed[0]._id}`).send({ trainer: classSeed[1].activity._id });
    expect(response.status).toBe(400);
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
