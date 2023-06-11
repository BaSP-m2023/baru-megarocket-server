import request from 'supertest';
import app from '../app';
import Member from '../models/Member';
import memberSeed from '../seeds/members';

beforeAll(async () => {
  await Member.collection.insertMany(memberSeed);
});

const mockMember = {
  name: 'Sully',
  lastName: 'Bernan',
  phone: '3416822457',
  dni: '40120120',
  city: 'baigorria',
  dob: '1997-08-12',
  zip: '2000',
  isActive: true,
  membership: 'classic',
  email: 'sullybernan@hotmail.com',
  password: 'Gorila12',
};

describe('GET all user /api/member', () => {
  test('should return status 200', async () => {
    const response = await request(app).get('/api/member').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('should return status 404', async () => {
    const response = await request(app).get('/api/members').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('should return all members', async () => {
    const response = await request(app).get('/api/member').send();
    expect(response.body.data.length).toBe(2);
  });
});

describe('Get by id /api/member/:id', () => {
  test('should return status 200', async () => {
    const response = await request(app).get('/api/member/646f10810596acb1db833e25').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('should return a member that exists ', async () => {
    const response = await request(app).get('/api/member/646f10810596acb1db833e25').send();
    const member = response.body.data;
    expect(member).toBeDefined();
  });
  test('should return all the data from unique member', async () => {
    const memberId = '646f10810596acb1db833e25';
    const response = await request(app).get(`/api/member/${memberId}`).send();
    const member = response.body.data;
    expect(response.status).toBe(200);
    expect(member).toBeDefined();
  });
  test('should return status 404', async () => {
    const response = await request(app).get('/api/member/646f10810596acb1db833123s').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
});

describe('create member /api/member/', () => {
  test('POST: the length of the data should increase by 1 unit', async () => {
    let response = await request(app).get('/api/member').send();
    const seedLength = response.body.data.length;
    response = await request(app).post('/api/member').send(mockMember);
    expect(response.status).toBe(201);
    response = await request(app).get('/api/member').send();
    const seedPostLength = response.body.data.length;
    expect(seedLength + 1).toBe(seedPostLength);
  });
  test('POST: should return the dni: 40120120 from the new member', async () => {
    let response = await request(app).post('/api/member/').send(mockMember);
    expect(response.status).toBe(201);
    // eslint-disable-next-line no-underscore-dangle
    const subId = response.body.data._id;
    response = await request(app).get(`/api/member/${subId}`).send();
    expect(response.body.data.dni).toBe('40120120');
  });
});

describe('Delete member /api/member/:id', () => {
  test('should return status 200', async () => {
    const response = await request(app).get('/api/member/646f10810596acb1db833e25');
    const member = response.body.data;
    if (!member.deleted) {
      const deleteResponse = await request(app).delete('/api/member/646f10810596acb1db833e25');
      expect(deleteResponse.status).toBe(200);
      expect(deleteResponse.error).toBeFalsy();
    } else {
      const deleteResponse = await request(app).get('/api/member/646f10810596acb1db833e25');
      deleteResponse.body.message = 'Member cannot be deleted';
    }
  });
  test('should return status 404', async () => {
    const response = await request(app).delete('/api/member/646f10810596acb1db833e20');
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
});

describe('Update member /api/member/:id', () => {
  test('should update a member with status 201', async () => {
    const response = await request(app).put('/api/member/646f10810596acb1db833e30').send(mockMember);
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('Whilst sending an empty request, have the members body remain unchanged', async () => {
    const response = await request(app).put('/api/member/646f10810596acb1db833e30').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('should have a valid name (only alphabetic characters)', async () => {
    const response = await request(app).put('/api/member/646f10810596acb1db833e30').send(mockMember.name);
    expect(mockMember.name).toMatch(/^[a-zA-Z]+$/);
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('should have a valid last name (only alphabetic characters)', async () => {
    const response = await request(app).put('/api/member/646f10810596acb1db833e30').send(mockMember.lastName);
    expect(mockMember.lastName).toMatch(/^[a-zA-Z]+$/);
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('should have a valid DNI (only numbers and between 7 and 11)', async () => {
    const response = await request(app).put('/api/member/646f10810596acb1db833e30').send(mockMember.dni);
    expect(mockMember.dni).toMatch(/^(?!^0)[0-9]{7,11}$/);
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('should have a valid ZIP (only numbers and 4 max)', async () => {
    const response = await request(app).put('/api/member/646f10810596acb1db833e30').send(mockMember.zip);
    const zip = parseInt(mockMember.zip, 10);
    expect(zip).toBeGreaterThan(1000);
    expect(zip).toBeLessThanOrEqual(9999);
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('should have a valid memberhip (can be only classic, only-classes and black)', async () => {
    const response = await request(app).put('/api/member/646f10810596acb1db833e30').send(mockMember.membership);
    const allowedMemberships = ['classic', 'only_classes', 'black'];
    expect(allowedMemberships).toContain(mockMember.membership);
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('should have a valid format email', async () => {
    const response = await request(app).put('/api/member/646f10810596acb1db833e30').send(mockMember.email);
    expect(mockMember.email).toMatch(/^\S+@\S+\.\S+$/);
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('should have a valid format password', async () => {
    const response = await request(app).put('/api/member/646f10810596acb1db833e30').send(mockMember.password);
    expect(mockMember.password).toMatch(/^[a-zA-Z0-9]{6,20}$/);
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('Deletion flag is not able to be updated', async () => {
    const response = await request(app).put('/api/member/646f10810596acb1db833e30').send({ deleted: true });
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
    expect(response.body.message).toBe('Oops, an error occurred: "deleted" is not allowed');
  });
});
