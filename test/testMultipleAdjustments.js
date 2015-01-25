var helper = require('./helper');

describe('Expression with multiple adjustments', function () {
    it('should parse multiple adjustments', function () {
        helper.assertDateMathEquals('2014-11-18||+1M-1M', '2014-11-18');
        helper.assertDateMathEquals('2014-11-18||+1M-1m', '2014-12-17T23:59');
        helper.assertDateMathEquals('2014-11-18||-1m+1M', '2014-12-17T23:59');
        helper.assertDateMathEquals('2014-11-18||+1M/M', '2014-12-01');
        helper.assertDateMathEquals('2014-11-18||+1M/M+1h', '2014-12-01T01');
    });
});