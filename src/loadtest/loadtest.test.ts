/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'chai';
import { describe, it } from 'mocha';
import csvjson from 'csvtojson';
import path from 'path';

describe('LOADTEST output verification', () => {
  it('should have less than 20% error percentage', async () => {
    const csv = await csvjson().fromFile(path.resolve('loadtest_stats.csv'));
    const reqcount = csv[0]['Request Count'];
    const failcount = csv[0]['Failure Count'];
    const errpercent = (failcount / reqcount) * 100;
    expect(errpercent).lessThan(20);
  });
});
