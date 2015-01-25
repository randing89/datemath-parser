var parser = require('../index');
var helper = require('./helper');

describe('Expression with now', function () {
    it('should parse expression with now', function () {
        var now = parser.parse('2014-11-18T14:27:32', 0, false, null);

        helper.assertDateMathEquals('now', '2014-11-18T14:27:32', now, false, null);
        helper.assertDateMathEquals('now+M', '2014-12-18T14:27:32', now, false, null);
        helper.assertDateMathEquals('now-2d', '2014-11-16T14:27:32', now, false, null);
        helper.assertDateMathEquals('now/m', '2014-11-18T14:27', now, false, null);

        // timezone does not affect now
        helper.assertDateMathEquals('now/m', '2014-11-18T14:27', now, false, '+02:00');
    });
});