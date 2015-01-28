# datemath-parser
A date math parser compatible with elastic search format

[![Build Status](https://travis-ci.org/randing89/datemath-parser.svg)](https://travis-ci.org/randing89/datemath-parser)
[![Coverage Status](https://coveralls.io/repos/randing89/datemath-parser/badge.svg)](https://coveralls.io/r/randing89/datemath-parser)

# Date Math Definition
http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/mapping-date-format.html#date-math

> The date type supports using date math expression when using it in a query/filter (mainly makes sense in range query/filter).

> The expression starts with an "anchor" date, which can be either now or a date string (in the applicable format) ending with `||`.

> It can then follow by a math expression, supporting `+`, `-` and `/` (rounding).

> The units supported are `y` (year), `M` (month), `w` (week), `d` (day), `h` (hour), `m` (minute), and `s` (second).

> Here are some samples: `now+1h`, `now+1h+1m`, `now+1h/d`, `2012-01-01||+1M/d`.

> Note, when doing range type searches, and the upper value is inclusive, the rounding will properly be rounded to the ceiling instead of flooring it.


# Usage
Returns an integer representing timestamp in milliseconds
```javascript
var parser = require('datemath-parser');
parser.parse(dateMathExpression, [now], [roundUp], [timeZone]);
```
