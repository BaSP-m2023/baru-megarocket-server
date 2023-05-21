/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import app from '../app';
import Class from '../models/Class';
import classSeed from '../seeds/classes';

beforeAll(async () => {
  await Class.collection.insertMany(classSeed);
});

// const mockUpdatedClass = {
//   activity: {
//     _id: '6465286dad795d0bf31704f1',
//     name: 'Sorcery',
//     description: 'throw spells and that kind of stuff.',
//     isActive: true,
//   },
//   trainer: [
//     {
//       _id: '6460763768fd665d7bf97f13',
//       firstName: 'Harald',
//       lastName: 'Potterson',
//       dni: '06266798',
//       phone: '1221221122',
//       email: 'hpoter3@imgur.com',
//       password: 'tvqTPiNMMMMMBb1',
//       salar: '$170000',
//       isActive: true,
//     },
//   ],
//   day: 'Monday',
//   time: '19:10',
//   capacity: 100000000000000,
//   deleted: true,
// };

describe('PUT logic delete by id api/class/delete/:id', () => {
  test('return status 200 - "delete" property change false for true', async () => {
    const response = await request(app).put(`/api/class/delete/${classSeed[0]._id}`).send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
    expect(response._body.deleted_class.deleted).toBe(true);
  });
  test('return status 404', async () => {
    const response = await request(app).put(`/api/class/delete/${classSeed[0]._id}`).send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('return status 400', async () => {
    const response = await request(app).put('/api/class/delete/lalalalalalaa').send();
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
  test('the deleted object is restored', async () => {
    const restore = await request(app).put(`/api/class/restore/${classSeed[0]._id}`).send();
    expect(restore._body.restored_class.deleted).toBe(false);
  });
});
