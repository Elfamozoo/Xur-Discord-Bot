const {SlashCommandBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('xur')
        .setDescription('Information sur la localisation de Xur.'),
    async execute(interaction) {
        
    }
}
