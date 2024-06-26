const {Client, Events, GatewayIntentBits} = require('discord.js')
const {config} = require('dotenv')
config();

const token = process.env.DISCORD_TOKEN