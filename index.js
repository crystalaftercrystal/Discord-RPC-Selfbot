const express = require('express');
const { Client, RichPresence } = require('discord.js-selfbot-v13');

const app = express();
app.get('/', (req, res) => res.send('Roblox RPC is alive!'));
app.listen(process.env.PORT || 3000, () => console.log('Web server ready'));

const client = new Client({ checkUpdate: false });

client.on('ready', () => {
  console.log(`SUCCESS: Logged in as ${client.user.tag}`);
  client.user.setStatus('dnd');
  const rpc = new RichPresence(client)
    .setApplicationId('363445589247131668')
    .setType('PLAYING')
    .setName('Roblox');
  client.user.setActivity(rpc);
});

client.on('error', (err) => console.error('CLIENT ERROR:', err));

console.log('Token exists?', Boolean(process.env.token));
client.login(process.env.token).catch((err) => {
  console.error('LOGIN FAILED:', err.message);
});
