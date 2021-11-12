/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'chai';
import { describe, it } from 'mocha';
import supertest from 'supertest';
import app from '../..';

describe('GET converted file', () => {
  it('should return error message', async () => {
    const resp = await supertest(app).get('/convert/file/sample.csv');
    expect(resp.statusCode).equals(400);
    expect(resp.body.error).equals('File not found');
  });

  it('should return success response', async () => {
    const resp = await supertest(app).post('/convert/file/').attach('file', 'mockdata/sample.csv');
    const { filename } = resp.body;
    const resp2 = await supertest(app).get(`/convert/file/${filename}`);
    expect(resp2.statusCode).equals(200);
    expect(resp2.type).equals('text/csv');
  });
});
