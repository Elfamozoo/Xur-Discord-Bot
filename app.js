const {Client, Events, GatewayIntentBits} = require('discord.js')
const {config} = require('dotenv')
config();
const token = process.env.DISCORD_TOKEN

const client = new Client({intents: [GatewayIntentBits.Guilds]});

client.once(Events.ClientReady, readyClient => {
    console.log(`Connecté sur le login ${client.user.tag}`)
})

client.login(token)