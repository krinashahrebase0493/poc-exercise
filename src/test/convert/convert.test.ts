/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'chai';
import { describe, it } from 'mocha';
import supertest from 'supertest';
import { spawn } from 'child_process';
import * as fs from 'fs';
import app from '../..';

require('ts-mocha');

describe('POST convert file', () => {
  it('should return error message', async () => {
    const resp = await supertest(app).post('/convert/file/');
    expect(resp.statusCode).equals(400);
    expect(resp.body.error).to.equals('File not found');
  });

  it('should return success message', async () => {
    const resp = await supertest(app).post('/convert/file/').attach('file', 'mockdata/sample.csv');
    const expectedCsv = await fs.readFileSync('mockdata/output.csv').toString();
    expect(resp.statusCode).equals(200);
    expect(resp.type).equals('text/csv');
    expect(resp.text).equals(expectedCsv);
  });
});

describe('PYTHON script to convert file', () => {
  it('should return success message', (done) => {
    const pyresp = spawn('python', ['pyscripts/pivotCsv.py', 'mockdata/sample.csv']);
    pyresp.stdout.on('data', (data : Buffer) => {
      const output = fs.readFileSync('mockdata/output.csv');
      expect(data.toString()).equals(output.toString());
      done();
    });
  });
});
