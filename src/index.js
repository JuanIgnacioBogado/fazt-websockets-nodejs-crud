import path from 'path';
import express from 'express';
import {createServer} from 'http';
import {Server as webSocketServer} from 'socket.io';
import {v4 as uuid} from 'uuid';

let notes = [];

const app = express();
const server = createServer(app);
const io = new webSocketServer(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
    console.log('new connection', socket.id);

    socket.emit('server:loadnotes', notes);

    socket.on('client:newnote', data => {
        data.id = uuid();
        notes.push(data);
        io.emit('server:newnote', data);
    });

    socket.on('client:deletenote', id => {
        notes = notes.filter(note => note.id !== id);
        io.emit('server:loadnotes', notes);
    });

    socket.on('client:getnote', id => {
        const note = notes.find(note => note.id === id);
        socket.emit('server:selectednote', note);
    });

    socket.on('client:updatenote', ({id, title, description}) => {
        notes = notes.map(note => note.id === id ? {id, title, description} : note);
        io.emit('server:loadnotes', notes);
    });
});

server.listen(3000, () => console.log('Server on port', 3000));