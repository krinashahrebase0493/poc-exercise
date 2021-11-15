/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'chai';
import { describe, it } from 'mocha';
import supertest from 'supertest';
import { spawn } from 'child_process';
import * as fs from 'fs';
import path from 'path';
import app from '../..';

describe('POST convert file', () => {
  it('should return error message', async () => {
    const resp = await supertest(app).post('/convert/file/');
    expect(resp.statusCode).equals(400);
    expect(resp.body.error).to.equals('File not found');
  });

  it('should return success message', async () => {
    const resp = await supertest(app).post('/convert/file/').attach('file', 'mockdata/sample.csv');
    expect(resp.statusCode).equals(200);
    expect(resp.type).equals('text/csv');
  });
});

describe('PYTHON script to convert file', () => {
  it('should return success message', (done) => {
    const pyresp = spawn('python', ['pyscripts/pivotCsv.py', path.resolve('mockdata/sample.csv'), path.resolve('mockdata/converted/sample.csv'), path.resolve('mockdata/converted/')]);
    pyresp.stdout.on('data', () => {
      const generatedOutput = fs.readFileSync(path.resolve('mockdata/converted/sample.csv'));
      const output = fs.readFileSync(path.resolve('mockdata/output.csv'));
      expect(generatedOutput.toString()).equals(output.toString());
      done();
    });
  });
});
