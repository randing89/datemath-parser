var moment = require('moment');
var formats = require('./src/supportedFormats');

module.exports = {
    parse: function (expression, now, roundUp, timeZone) {
        var self = this;

        var math, time;
        if (expression.substring(0, 3) === 'now') {
            math = expression.substring(3);
            time = moment.utc(now) || moment.utc();
        } else {
            var separator = expression.indexOf('||');

            // If the math expression doesn't have separator
            if (separator === -1) {
                // Add timezone
                math = '';
                time = self.parseTime(expression, timeZone);
            } else {
                math = expression.substr(separator + 2);
                time = self.parseTime(expression.substr(0, separator), timeZone);
            }
        }

        // If there is no further expression to process
        if (!math || math === '') {
            return time.valueOf();
        }

        return self.evaluate(math, time, roundUp).valueOf();
    },

    evaluate: function (expression, now, roundUp) {
        var self = this;
        var val = 0;

        for (var i = 0; i < expression.length;) {
            var char = expression[i];
            var next;

            i += 1;

            if (i > expression.length) {
                throw new Error('truncated date math [' + expression + ']');
            }

            if (char === '/') {
                // Round result
                next = expression[i++];

                switch (next) {
                    case 'y': case 'Y': now = self.roundDate(now, 'year', roundUp); break;
                    case 'M': now = self.roundDate(now, 'month', roundUp); break;
                    case 'd': case 'D': now = self.roundDate(now, 'date', roundUp); break;
                    case 'w': case 'W': now = self.roundDate(now, 'weekday', roundUp); break;
                    case 'h': case 'H': now = self.roundDate(now, 'hour', roundUp); break;
                    case 'm': now = self.roundDate(now, 'minute', roundUp); break;
                    case 's': case 'S': now = self.roundDate(now, 'second', roundUp); break;

                }

            } else if (char === '+' || char === '-') {
                if (i >= expression.length) {
                    throw new Error('truncated date math [' + expression + ']');
                }

                val = 0;
                next = expression[i];

                while (next >= '0' && next <= '9') {
                    // Consume the digit
                    i += 1;
                    
                    if (i >= expression.length) {
                        throw new Error('truncated date math [' + expression + ']');
                    }
                    
                    val = val * 10 + parseInt(next, 10);
                    next = expression[i];
                }

                val = val || 1;
                val = (char === '+') ? val : -val;

            } else if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')) {
                switch (char) {
                    case 'y': case 'Y': now = self.calculate(now, val, 'year'); break;
                    case 'M': now = self.calculate(now, val, 'month'); break;
                    case 'd': case 'D': now = self.calculate(now, val, 'date'); break;
                    case 'w': case 'W': now = self.calculate(now, val, 'week'); break;
                    case 'h': case 'H': now = self.calculate(now, val, 'hour'); break;
                    case 'm': now = self.calculate(now, val, 'minute'); break;
                    case 's': case 'S': now = self.calculate(now, val, 'second'); break;
                    default:
                        throw new Error('unit [' + char + '] not supported for date math [' + expression + ']');
                }
            } else {
                throw new Error('operator not supported for date math [' + char + ']');
            }
        }

        return now;
    },

    calculate: function (now, offsetVal, unit) {
        now[unit](now[unit]() + offsetVal);

        return now;
    },

    roundDate: function (now, unit, roundUp) {
        switch (unit) {
            case 'year': now.month(0); /* falls through */
            case 'month': now.date(1); /* falls through */
            case 'date': now.hours(0); /* falls through */
            case 'weekday': now.hours(0); /* falls through */
            case 'hour': now.minutes(0); /* falls through */
            case 'minute': now.seconds(0); /* falls through */
            case 'second': now.milliseconds(0); /* falls through */
        }

        if (roundUp) {
            if (unit === 'weekday') {
                now.weekday(8);
            } else {
                now[unit](now[unit]() + 1);
            }

            now = moment.utc(now.valueOf() - 1);
        } else {
            if (unit === 'weekday') {
                now.weekday(1);
            }
        }

        return now;
    },

    parseTime: function (s, timeZone) {
        if (s && s.length > 4 && (s >= 0 || s < 0)) {
            // Timestamp
            if (s.length > 13) {
                throw new Error('Bad timestamp in [' + s + ']');
            }

            return (s.length === 10) ? moment(+s * 1000) : moment(+s);
        }

        if (!/^[\dTZ\-\+:\.]+$/.test(s)) {
            throw new Error('Bad time with format in [' + s + ']');
        }

        var time = moment.utc(s, formats);

        // Ignore the timeZone parameter if the given time already have one
        if (!/[\+\-]\d+:\d+|Z$/.test(s) && timeZone) {
            var normalizedTimezoneOffset = moment.utc().utcOffset(timeZone).utcOffset();

            time.subtract(normalizedTimezoneOffset, 'minute');
        }

        return time;
    }
};