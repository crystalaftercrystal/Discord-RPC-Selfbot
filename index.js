const express = require('express');
const express = require('express');
const WebSocket = require('ws');

const app = express();
app.get('/', (req, res) => res.send('Roblox RPC is alive!'));
app.listen(process.env.PORT || 3000);

function connect() {
  const ws = new WebSocket('wss://gateway.discord.gg/?v=10&encoding=json');
  let heartbeatInterval;

  ws.on('open', () => console.log('Connected to Discord Gateway'));

  ws.on('message', (data) => {
    const payload = JSON.parse(data);
    if (payload.op === 10) {
      heartbeatInterval = setInterval(() => {
        ws.send(JSON.stringify({ op: 1, d: null }));
      }, payload.d.heartbeat_interval);

      ws.send(JSON.stringify({
        op: 2,
        d: {
          token: process.env.token,
          properties: { os: 'Windows', browser: 'Chrome', device: '' },
          presence: {
            activities: [{
              name: 'Roblox',
              type: 0,
              application_id: '363445589247131668'
            }],
            status: 'dnd',
            since: 0,
            afk: false
          }
        }
      }));
    }
    if (payload.t === 'READY') {
      console.log('SUCCESS! Playing Roblox is now live for:', payload.d.user.username);
    }
  });

  ws.on('close', (code) => {
    console.log('Disconnected, code:', code);
    clearInterval(heartbeatInterval);
    setTimeout(connect, 5000);
  });
}

connect();
