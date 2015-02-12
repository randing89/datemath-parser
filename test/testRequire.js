var parse = require('../index').parse;
var helper = require('./helper');
var assert = require('assert');

describe('Expression with now', function () {
    it('should allow parsing', function () {
        var now = parse('now-20m');
        assert(now);
    });
});

