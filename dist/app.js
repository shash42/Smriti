'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _primary = require('./routes/primary.routes');

var _primary2 = _interopRequireDefault(_primary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));
app.set('views', _path2.default.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var port = process.argv[2] || 8080;

var server = app.listen(port, function () {
  console.log('Listening to port ' + server.address().port);
});

// Mount primary routes 
app.use(function (req, res, next) {
  console.log('Incoming ' + req.method + ' request to ' + req.url);
  next();
});

app.use('/', _primary2.default);

// Export for testing 
exports.default = server;
//# sourceMappingURL=app.js.map