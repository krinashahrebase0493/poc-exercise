/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'chai';
import { describe, it } from 'mocha';
import supertest from 'supertest';
import app from '../..';

describe('POST convert file', () => {
  it('should return error message', async () => {
    const resp = await supertest(app).post('/convert/file/');
    expect(resp.statusCode).equals(400);
    expect(resp.body.data).to.equals('File not found');
  });

  it('should return success message', async () => {
    const resp = await supertest(app).post('/convert/file/').attach('file', 'mockdata/sample.csv');
    expect(resp.statusCode).equals(200);
    expect(resp.body.data).to.equals('Converted successfully\n');
  });
});
