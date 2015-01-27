var helper = require('./helper');

describe('Rounding test', function () {
    it('should parse expression with rounding', function () {
        helper.assertDateMathEquals('2014-11-18||/y', '2014-01-01', 0, false, null);
        helper.assertDateMathEquals('2014-11-18||/y', '2014-12-31T23:59:59.999', 0, true, null);
        helper.assertDateMathEquals('2014||/y', '2014-01-01', 0, false, null);
        helper.assertDateMathEquals('2014-01-01T00:00:00.001||/y', '2014-12-31T23:59:59.999', 0, true, null);

        helper.assertDateMathEquals('2014-11-18||/M', '2014-11-01', 0, false, null);
        helper.assertDateMathEquals('2014-11-18||/M', '2014-11-30T23:59:59.999', 0, true, null);
        helper.assertDateMathEquals('2014-11||/M', '2014-11-01', 0, false, null);
        helper.assertDateMathEquals('2014-11||/M', '2014-11-30T23:59:59.999', 0, true, null);

        helper.assertDateMathEquals('2014-11-18T14||/w', '2014-11-17', 0, false, null);
        helper.assertDateMathEquals('2014-11-18T14||/w', '2014-11-23T23:59:59.999', 0, true, null);
        helper.assertDateMathEquals('2014-11-18||/w', '2014-11-17', 0, false, null);
        helper.assertDateMathEquals('2014-11-18||/w', '2014-11-23T23:59:59.999', 0, true, null);

        helper.assertDateMathEquals('2014-11-18T14||/d', '2014-11-18', 0, false, null);
        helper.assertDateMathEquals('2014-11-18T14||/d', '2014-11-18T23:59:59.999', 0, true, null);
        helper.assertDateMathEquals('2014-11-18||/d', '2014-11-18', 0, false, null);
        helper.assertDateMathEquals('2014-11-18||/d', '2014-11-18T23:59:59.999', 0, true, null);

        helper.assertDateMathEquals('2014-11-18T14:27||/h', '2014-11-18T14', 0, false, null);
        helper.assertDateMathEquals('2014-11-18T14:27||/h', '2014-11-18T14:59:59.999', 0, true, null);
        helper.assertDateMathEquals('2014-11-18T14||/H', '2014-11-18T14', 0, false, null);
        helper.assertDateMathEquals('2014-11-18T14||/H', '2014-11-18T14:59:59.999', 0, true, null);
        helper.assertDateMathEquals('2014-11-18T14:27||/h', '2014-11-18T14', 0, false, null);
        helper.assertDateMathEquals('2014-11-18T14:27||/h', '2014-11-18T14:59:59.999', 0, true, null);
        helper.assertDateMathEquals('2014-11-18T14||/H', '2014-11-18T14', 0, false, null);
        helper.assertDateMathEquals('2014-11-18T14||/H', '2014-11-18T14:59:59.999', 0, true, null);

        helper.assertDateMathEquals('2014-11-18T14:27:32||/m', '2014-11-18T14:27', 0, false, null);
        helper.assertDateMathEquals('2014-11-18T14:27:32||/m', '2014-11-18T14:27:59.999', 0, true, null);
        helper.assertDateMathEquals('2014-11-18T14:27||/m', '2014-11-18T14:27', 0, false, null);
        helper.assertDateMathEquals('2014-11-18T14:27||/m', '2014-11-18T14:27:59.999', 0, true, null);

        helper.assertDateMathEquals('2014-11-18T14:27:32.123||/s', '2014-11-18T14:27:32', 0, false, null);
        helper.assertDateMathEquals('2014-11-18T14:27:32.123||/s', '2014-11-18T14:27:32.999', 0, true, null);
        helper.assertDateMathEquals('2014-11-18T14:27:32||/s', '2014-11-18T14:27:32', 0, false, null);
        helper.assertDateMathEquals('2014-11-18T14:27:32||/s', '2014-11-18T14:27:32.999', 0, true, null);
    });
});