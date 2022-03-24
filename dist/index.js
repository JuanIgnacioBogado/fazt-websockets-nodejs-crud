"use strict";

var _path = _interopRequireDefault(require("path"));

var _express = _interopRequireDefault(require("express"));

var _http = require("http");

var _socket = require("socket.io");

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var notes = [];
var app = (0, _express["default"])();
var server = (0, _http.createServer)(app);
var io = new _socket.Server(server);
app.use(_express["default"]["static"](_path["default"].join(__dirname, 'public')));
io.on('connection', function (socket) {
  console.log('new connection', socket.id);
  socket.emit('server:loadnotes', notes);
  socket.on('client:newnote', function (data) {
    data.id = (0, _uuid.v4)();
    notes.push(data);
    io.emit('server:newnote', data);
  });
  socket.on('client:deletenote', function (id) {
    notes = notes.filter(function (note) {
      return note.id !== id;
    });
    io.emit('server:loadnotes', notes);
  });
  socket.on('client:getnote', function (id) {
    var note = notes.find(function (note) {
      return note.id === id;
    });
    socket.emit('server:selectednote', note);
  });
  socket.on('client:updatenote', function (_ref) {
    var id = _ref.id,
        title = _ref.title,
        description = _ref.description;
    notes = notes.map(function (note) {
      return note.id === id ? {
        id: id,
        title: title,
        description: description
      } : note;
    });
    io.emit('server:loadnotes', notes);
  });
});
server.listen(3000, function () {
  return console.log('Server on port', 3000);
});