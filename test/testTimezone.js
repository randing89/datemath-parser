var helper = require('./helper');

describe('Expression with timezone', function () {
    it('should parse dates with timezone', function () {
        // timezone works within date format
        helper.assertDateMathEquals('2014-05-30T20:21+02:00', '2014-05-30T18:21:00.000');

        // but also externally
        helper.assertDateMathEquals('2014-05-30T20:21', '2014-05-30T18:21:00.000', 0, false, '+02:00');

        // and timezone in the date has priority
        helper.assertDateMathEquals('2014-05-30T20:21+03:00', '2014-05-30T17:21:00.000', 0, false, '-08:00');
        helper.assertDateMathEquals('2014-05-30T20:21Z', '2014-05-30T20:21:00.000', 0, false, '-08:00');
    });
});