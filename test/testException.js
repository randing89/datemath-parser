var helper = require('./helper');

describe('Exception test', function () {
    it('should throw illegal math format exception', function () {
        helper.assertParseException('Expected date math unsupported operator exception', '2014-11-18||*5', 'operator not supported');
        helper.assertParseException('Expected date math incompatible rounding exception', '2014-11-18||/2m', 'rounding');
        helper.assertParseException('Expected date math illegal unit type exception', '2014-11-18||+2a', 'unit [a] not supported');
        helper.assertParseException('Expected date math truncation exception', '2014-11-18||+12', 'truncated');
        helper.assertParseException('Expected date math truncation exception', '2014-11-18||-', 'truncated');
    });

    it('should throw illegal date format exception', function () {
        helper.assertParseException('Expected bad timestamp exception', Number.MAX_VALUE + '0', 'timestamp');
        helper.assertParseException('Expected bad date format exception', '123bogus', 'with format');
    });
});