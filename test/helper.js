var expect = require('chai').expect;
var moment = require('moment');

var parser = require('../index');

module.exports = {
    assertDateMathEquals: function (test, expected, now, roundUp, timeZone, useTimeZoneForRounding) {
        now = now || 0;
        roundUp = !!roundUp;
        timeZone = timeZone || null;

        var testTimestamp = parser.parse(test, now, roundUp, timeZone, useTimeZoneForRounding);
        var expectedTimestamp = parser.parse(expected);

        this.assertDateMathResult(test, testTimestamp);
        this.assertDateMathResult(expected, expectedTimestamp);

        expect(testTimestamp).to.be.equals(expectedTimestamp,
            'Date math not equal\n' +
            '       Original               : ' + test + '\n' +
            '       Expected               : ' + expected + '\n' +
            '       Expected milliseconds  : ' + expectedTimestamp + '\n' +
            '       Actual                 : ' + moment(testTimestamp).format() + '\n' +
            '       Actual milliseconds    : ' + testTimestamp + '\n');
    },

    assertDateMathResult: function (original, parsedResult) {
        expect(parsedResult).to.be.a('number',
            'Date math parse result should be integer\n' +
            '       Original               : ' + original + '\n' +
            '       Parsed result          : ' + parsedResult + '\n');
    },

    assertParseException: function (msg, date, exc) {
        expect(parser.parse.bind(parser, date, 0)).to.throw(new RegExp(exc), 'Date: ' + date + '\n' + msg);
    }
};
