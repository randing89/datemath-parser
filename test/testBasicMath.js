var helper = require('./helper');

describe('Basic math test', function () {
    it('should parse basic math', function () {
        helper.assertDateMathEquals('2014-11-18||+y', '2015-11-18');
        helper.assertDateMathEquals('2014-11-18||-2y', '2012-11-18');

        helper.assertDateMathEquals('2014-11-18||+3M', '2015-02-18');
        helper.assertDateMathEquals('2014-11-18||-M', '2014-10-18');

        helper.assertDateMathEquals('2014-11-18||+1w', '2014-11-25');
        helper.assertDateMathEquals('2014-11-18||-3w', '2014-10-28');

        helper.assertDateMathEquals('2014-11-18||+22d', '2014-12-10');
        helper.assertDateMathEquals('2014-11-18||-423d', '2013-09-21');

        helper.assertDateMathEquals('2014-11-18T14||+13h', '2014-11-19T03');
        helper.assertDateMathEquals('2014-11-18T14||-1h', '2014-11-18T13');
        helper.assertDateMathEquals('2014-11-18T14||+13H', '2014-11-19T03');
        helper.assertDateMathEquals('2014-11-18T14||-1H', '2014-11-18T13');

        helper.assertDateMathEquals('2014-11-18T14:27||+10240m', '2014-11-25T17:07');
        helper.assertDateMathEquals('2014-11-18T14:27||-10m', '2014-11-18T14:17');

        helper.assertDateMathEquals('2014-11-18T14:27:32||+60s', '2014-11-18T14:28:32');
        helper.assertDateMathEquals('2014-11-18T14:27:32||-3600s', '2014-11-18T13:27:32');
    });

    it('should parse lenient empty math', function () {
        helper. assertDateMathEquals('2014-05-30T20:21||', '2014-05-30T20:21:00.000');
    });
});