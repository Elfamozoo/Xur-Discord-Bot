const {SlashCommandBuilder} = require("discord.js");
const isXurAvailable = require("../../services/isXurAvailable")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('xur')
        .setDescription('Information sur la localisation de Xur.'),
    async execute(interaction) {
        await interaction.reply(await isXurAvailable())
    }
}
