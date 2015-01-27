var helper = require('./helper');

describe('Expression with timestamp', function () {
    it('should parse timestamp', function () {
        helper.assertDateMathEquals('1418248078000', '2014-12-10T21:47:58.000');

        // timezone does not affect timestamps
        helper.assertDateMathEquals('1418248078000', '2014-12-10T21:47:58.000', 0, false, '-08:00');

        // datemath still works on timestamps
        helper.assertDateMathEquals('1418248078000||/m', '2014-12-10T21:47:00.000');

        // test second format
        helper.assertDateMathEquals('1418248078', '2014-12-10T21:47:58.000');

        // a timestamp before 10000 is a year
        helper.assertDateMathEquals('9999', '9999-01-01T00:00:00.000');

        // 10000 is the first timestamp
        helper.assertDateMathEquals('10000', '1970-01-01T00:00:10.000');

        // but 10000 with T is still a date format
        helper.assertDateMathEquals('10000T', '10000-01-01T00:00:00.000');
    });
});