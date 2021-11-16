/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'chai';
import { describe, it } from 'mocha';
import csvjson from 'csvtojson';
import path from 'path';

describe('LOADTEST output verification', () => {
  it('should have less than 20% error percentage', async () => {
    const csv = await csvjson().fromFile(path.resolve('summary'));
    let count = 0;
    let errcount = 0;
    let errpercent = 0;
    csv.forEach((val) => {
      count += 1;
      if (val.ErrorCount === '1') errcount += 1;
    });
    errpercent = (count / 100) * errcount;
    expect(errpercent).lessThan(20);
  });
});
