const express = require('express');
const app = express();
const http = require('http').createServer(app);
const cors = require('cors');
const io = require('socket.io')(http,{
    cors:{
        origin: "*"
    }
});
app.use(cors());


  let usuariosCoordinadores={};
  let usuariosAgentes={};
app.get('/agentes', (req, res) => {
  res.send(usuariosAgentes);
});
app.get('/coordinadores', (req, res) => {
  res.send(usuariosCoordinadores);
});
io.on('connection', (socket) => {
    let id=socket.id;
  console.log('Usuario conectado con id'+socket.id );
  
  
  socket.on('nuevo_usuario_coordinador', (data) => {
    usuariosCoordinadores[id] = data;
    io.emit('usuarios_coordinadores',id);
  });
  socket.on('nuevo_usuario_agente', (data) => {
    usuariosAgentes[id] = data;
    io.emit('usuarios_agentes', id);
  });
  socket.on('disconnect', () => {
    console.log('Usuario desconectado'+id );
    if (usuariosCoordinadores.hasOwnProperty(id)) {
      delete usuariosCoordinadores[id];
    } else {
      delete usuariosAgentes[id];
    }
  });
});

http.listen(3000, () => {
  console.log('Servidor Socket.IO escuchando en el puerto 3000');
});
