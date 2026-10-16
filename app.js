import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';

// Configuració del servidor
const app = express();
const server = createServer(app);
const io = new Server(server);
const __dirname = dirname(fileURLToPath(import.meta.url));

// Servir fitxers estàtics (com style.css)
app.use(express.static(__dirname));

// Servir la pàgina principal
app.get('/', function (req, res) {
  res.sendFile(join(__dirname, 'index.html'));
});

// Gestió de connexions Socket.IO
io.on('connection', function (socket) {
  console.log('Un usuari s\'ha connectat:', socket.id);

  // Recepció i validació de missatges
  socket.on('chat message', function (msg) {
    if (!msg || typeof msg.usuari !== 'string' || typeof msg.text !== 'string') {
      return;
    }

    const usuari = msg.usuari.trim();
    const text = msg.text.trim();

    // Validació de buits i límits (màxim 20 caràcters per al nom i 500 per al missatge)
    if (usuari === '' || text === '' || usuari.length > 20 || text.length > 500) {
      return;
    }

    // Hora generada pel servidor (hores i minuts)
    const horaMissatge = new Date();
    const hora = horaMissatge.toLocaleTimeString('ca-ES', { hour: '2-digit', minute: '2-digit' });

    // Difusió a tots els clients connectats
    io.emit('chat message', {
      usuari: usuari,
      text: text,
      hora: hora
    });
  });

  // Desconnexió del client
  socket.on('disconnect', function () {
    console.log('Un usuari s\'ha desconnectat:', socket.id);
  });
});

// Iniciar el servidor al port 3000
server.listen(3000, function () {
  console.log('Servidor funcionant a http://localhost:3000');
});