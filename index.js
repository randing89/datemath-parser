var moment = require('moment');
var formats = require('./src/supportedFormats');

// Add 5 digits year variations for compatibility 
formats.forEach(function(format) {
  if (format.indexOf('YYYY') !== -1) {
    formats.push(format.replace(/YYYY/, 'YYYYY'));
  }
});

module.exports = (function() {
  function parse(expression, now, roundUp, timeZone, useTimeZoneForRounding) {

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
        time = parseTime(expression, timeZone);
      } else {
        math = expression.substr(separator + 2);
        time = parseTime(expression.substr(0, separator), timeZone);
      }
    }

    // If there is no further expression to process
    if (!math || math === '') {
      return time.valueOf();
    }

    return evaluate(math, time, roundUp, timeZone, useTimeZoneForRounding).valueOf();
  }

  function evaluate(expression, now, roundUp, timeZone, useTimeZoneForRounding) {
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
          case 'y': case 'Y': now = roundDate(now, 'year', roundUp, timeZone, useTimeZoneForRounding); break;
          case 'M': now = roundDate(now, 'month', roundUp, timeZone, useTimeZoneForRounding); break;
          case 'd': case 'D': now = roundDate(now, 'date', roundUp, timeZone, useTimeZoneForRounding); break;
          case 'w': case 'W': now = roundDate(now, 'weekday', roundUp, timeZone, useTimeZoneForRounding); break;
          case 'h': case 'H': now = roundDate(now, 'hour', roundUp, timeZone, useTimeZoneForRounding); break;
          case 'm': now = roundDate(now, 'minute', roundUp); break;
          case 's': case 'S': now = roundDate(now, 'second', roundUp, timeZone, useTimeZoneForRounding); break;

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
          case 'y': case 'Y': now = calculate(now, val, 'year'); break;
          case 'M': now = calculate(now, val, 'month'); break;
          case 'd': case 'D': now = calculate(now, val, 'date'); break;
          case 'w': case 'W': now = calculate(now, val, 'week'); break;
          case 'h': case 'H': now = calculate(now, val, 'hour'); break;
          case 'm': now = calculate(now, val, 'minute'); break;
          case 's': case 'S': now = calculate(now, val, 'second'); break;
          default:
            throw new Error('unit [' + char + '] not supported for date math [' + expression + ']');
        }
      } else {
        throw new Error('operator not supported for date math [' + char + ']');
      }
    }

    return now;
  }

  function calculate(now, offsetVal, unit) {
    now[unit](now[unit]() + offsetVal);

    return now;
  }

  function roundDate(now, unit, roundUp, timeZone, useTimeZoneForRounding) {
    if (useTimeZoneForRounding) {
      now = now.utcOffset(timeZone);
    }

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
  }

  function parseTime(s, timeZone) {
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

  return {
    parse: parse,
    evaluate: evaluate,
    calculate: calculate,
    roundDate: roundDate,
    parseTime: parseTime
  };
})();

