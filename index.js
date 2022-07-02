/*
const { Client, Intents, Message } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const config = require('./config.json')


const commands = [{
  name: 'ping',
  description: 'Replies with Pong!'
}]; 

const CLIENT_ID = '915795301946765342'
const GUILD_ID = '899399705593806928' //ID del canal

const rest = new REST({ version: '9' }).setToken('OTE1Nzk1MzAxOTQ2NzY1MzQy.Yagy1g.tNhzGkXwBWE7cMUGm-6EG0nYqYE');

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    let channel = client.channels.cache.get('916336720910352404')
    channel.send('Hola Perris')
});

client.on("messageCreate", msg => {
  if (msg.content == 'ping') {
     msg.reply("pong");
  }
})

*/


const path = require('path')
const fs = require('fs')
const Discord = require("discord.js")
const client = new Discord.Client()
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');


const config = require('./config.json')

client.on("ready", async () => {

    console.log("\n Bot en funcionamiento")
    const baseFile = 'command-base.js'
    const commandBase = require(`./commands/${baseFile}`)
    console.log("\n Comandos cargados:")

    const readCommands = (dir) => {
        const files = fs.readdirSync(path.join(__dirname, dir))
        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file))

            if (stat.isDirectory()) {
                readCommands(path.join(dir, file))

            }
            else if (file !== baseFile) {
                const option = require(path.join(__dirname, dir, file))

                commandBase(option)
                console.log('hola mundo')
            }

        }
    }
    readCommands("commands")

    commandBase.listen(client);

})


client.login('OTE1Nzk1MzAxOTQ2NzY1MzQy.Yagy1g.tNhzGkXwBWE7cMUGm-6EG0nYqYE');

