import request from 'supertest';
import app from '../app';
import Admin from '../models/Admin';
import adminSeed from '../seeds/admins';

// eslint-disable-next-line no-unused-vars

const mockAdmin = {
  firstName: 'Carlos Luis Regino',
  lastName: 'Rodriguez',
  dni: '38790908',
  phone: '1128449713',
  email: 'rodriguez@gmail.com',
  city: 'Cordoba',
  password: 'Password1',
};

const missingFields = {
  firstName: 'Rodrigo',
  lastName: 'Jimenez',
};

const errorDataAdmin = {
  firstName: 'Juan10',
  lastName: 'Gonzalez',
  dni: '38790908',
  phone: '1128779713',
  email: 'gonzalezJ@gmail.com',
  city: 'Caseros',
  password: 'locd34pssD',
};

const emptyAdmin = {

};
/*
// eslint-disable-next-line no-unused-vars
let mockAdminId;
*/

beforeAll(async () => {
  await Admin.collection.insertMany(adminSeed);
});

describe('GET /api/admins', () => {
  test('should return status 200', async () => {
    const response = await request(app).get('/api/admins').send();
    expect(response.status).toBe(200);
  });
  test('should return status 404', async () => {
    const response = await request(app).get('/api/admin').send();
    expect(response.status).toBe(404);
  });
  test('should return all admins', async () => {
    const filterAdmins = adminSeed.filter((admin) => !admin.deleted);
    const response = await request(app).get('/api/admins');
    expect(response.body.data.length).toBe(filterAdmins.length);
  });
});

describe('GET /api/admins/:id', () => {
  test('should return status 200', async () => {
    const response = await request(app).get('/api/admins/6462d38b2118b6d63daf41f1').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('should return a admin that exists ', async () => {
    const response = await request(app).get('/api/admins/6462d38b2118b6d63daf41f1').send();
    const member = response.body.data;
    expect(member).toBeDefined();
  });
  test('should return all the data from unique admin', async () => {
    const adminId = '6462d38b2118b6d63daf41f1';
    const response = await request(app).get(`/api/admins/${adminId}`).send();
    const admin = response.body.data;
    expect(response.status).toBe(200);
    expect(admin).toBeDefined();
  });
  test('should return status 404', async () => {
    const response = await request(app).get('/api/admins/6462d38b2118b6d63daf41f5').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
});

describe('POST /api/admins/', () => {
  test('Should return status 201 when create a admin succsessfully', async () => {
    const response = await request(app).post('/api/admins').send(mockAdmin);
    expect(response.status).toBe(201);
    expect(response.error).toBeFalsy();
  });

  test('Should return status 404 when the route is wrong', async () => {
    const response = await request(app).post('/api/admin').send(mockAdmin);
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });

  test('Should return a status 400 when have missing data', async () => {
    const response = await request(app).post('/api/admins').send(missingFields);
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });

  test('Should return status 400 when de data is invalid', async () => {
    const response = await request(app).post('/api/admins').send(errorDataAdmin);
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
});

describe('PUT /api/admins/:id', () => {
  test('should update an admin with status 200', async () => {
    // eslint-disable-next-line no-template-curly-in-string
    const response = await request(app).put('/api/admins/6462d38b2118b6d63daf41f1').send(mockAdmin);
    expect(response.status).toBe(200);
  });
  test('should return status 404 if not found admin to update', async () => {
    const incorrectId = '6462d38b2118b6d63daf41f5';
    const response = await request(app).put(`/api/admins/${incorrectId}`).send(mockAdmin);
    expect(response.status).toBe(404);
  });
  test('Should return a status 400 when the data is empty', async () => {
    const response = await request(app).post('/api/admins').send(emptyAdmin);
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
  test('Should return status 400 when de data is invalid', async () => {
    const response = await request(app).post('/api/admins').send(errorDataAdmin);
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
  test('should have a valid firstName, lastName and city', async () => {
    // eslint-disable-next-line no-template-curly-in-string
    const response = await request(app).put('/api/admins/6462d38b2118b6d63daf41f1').send(mockAdmin);
    // eslint-disable-next-line no-undef
    if (response.body.firstName) {
      expect(response.body.firstName).toMatch(/^[a-zA-Z]+( [a-zA-Z]+)*$/);
    }
    // eslint-disable-next-line no-undef
    if (response.body.lastName) {
      expect(response.body.lastName).toMatch(/^[a-zA-Z]+( [a-zA-Z]+)*$/);
    }
    // eslint-disable-next-line no-undef
    if (response.body.city) {
      expect(response.body.city).toMatch(/^[a-zA-Z]+( [a-zA-Z]+)*$/);
    }
  });
  test('should have a valid dni and phone', async () => {
    // eslint-disable-next-line no-template-curly-in-string
    const response = await request(app).put('/api/admins/6462d38b2118b6d63daf41f1');
    // eslint-disable-next-line no-undef
    if (response.body.dni) {
      expect(response.body.dni).min(10000000).max(100000000).integer();
    }
    // eslint-disable-next-line no-undef
    if (response.body.phone) {
      expect(response.body.phone).min(1000000000).max(10000000000).integer();
    }
  });
  test('should have a valid email and password', async () => {
    // eslint-disable-next-line no-template-curly-in-string
    const response = await request(app).put('/api/admins/6462d38b2118b6d63daf41f1');
    // eslint-disable-next-line no-undef
    if (response.body.email) {
      expect(response.body.email).toMatch(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    }
    // eslint-disable-next-line no-undef
    if (response.body.password) {
      expect(response.body.password).toMatch(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    }
  });
});

describe('DELETE /api/admins/:id', () => {
  test('should return status 200 on delete', async () => {
    // eslint-disable-next-line no-underscore-dangle
    const firstIdFromSeeds = adminSeed[0]._id;
    const response = await request(app).delete(`/api/admins/${firstIdFromSeeds}`);
    expect(response.status).toBe(200);
  });
  test('should return status 400 when the id is invalid', async () => {
    const invalidId = '6462d38b211';
    const response = await request(app).delete(`/api/admins/${invalidId}`);
    expect(response.status).toBe(400);
  });
  test('should return status 404 when the id is not found', async () => {
    const idNotFound = '6462d38b2118b6d63daf4199';
    const response = await request(app).delete(`/api/admins/${idNotFound}`);
    expect(response.status).toBe(404);
  });
});
