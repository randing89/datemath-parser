var helper = require('./helper');

describe('Basic dates', function () {
    it('should parse basic dates', function () {
        helper.assertDateMathEquals('2014', '2014-01-01T00:00:00.000');
        helper.assertDateMathEquals('2014-05', '2014-05-01T00:00:00.000');
        helper.assertDateMathEquals('2014-05-30', '2014-05-30T00:00:00.000');
        helper.assertDateMathEquals('2014-05-30T20', '2014-05-30T20:00:00.000');
        helper.assertDateMathEquals('2014-05-30T20:21', '2014-05-30T20:21:00.000');
        helper.assertDateMathEquals('2014-05-30T20:21:35', '2014-05-30T20:21:35.000');
        helper.assertDateMathEquals('2014-05-30T20:21:35.123', '2014-05-30T20:21:35.123');
    });

    it('should not be effected by rounding', function () {
        helper.assertDateMathEquals('2014-11-12T22:55:00Z', '2014-11-12T22:55:00Z', 0, true, null);
        helper.assertDateMathEquals('2014-11-12T22:55:00Z', '2014-11-12T22:55:00Z', 0, false, null);
    });
});