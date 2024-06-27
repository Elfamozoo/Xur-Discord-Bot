const fs = require('node:fs');
const path = require('node:path');
const {Client, Collection, Events, GatewayIntentBits} = require('discord.js')
const {config} = require('dotenv')
config();
const token = process.env.DISCORD_TOKEN

const client = new Client({intents: [GatewayIntentBits.Guilds]});

client.commands = new Collection();
// path.join permet de construire le chemin vers le dossier commands.
const foldersPath = path.join(__dirname, 'commands');
// readdirSync permet de lire le contenu du dossier et de renvoyer un array de tout les dossiers/fichiers qu'il contient.
const commandFolders = fs.readdirSync(foldersPath);

// Pour chaque les folder trouvés dans commandFolders.
for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    // Avec filter on va recuperer tout les fichiers du array qui finissent par.js et les mettre dans un nouveau array.
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    // Pour chaque file trouvés dans commandFiles.
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        // On importe le contenu de filePath dans la variable command.
        const command = require(filePath);
        // Si "data" et "execute" sont dans command.
        if ('data' in command && 'execute' in command) {
            // Créer un nouvel élément dans la collection "commands". on va lui donner en key le nom de la command.
            client.commands.set(command.data.name, command);
        } else {
            // Sinon un message d'erreur s'enclenche.
            console.log(`[ALERTE] Il manque à la commande ${filePath} une propriété "data" ou "execute" requise.`);
        }
    }
}

client.on(Events.InteractionCreate, async interaction => {
    // Si la commande n'est pas une slash commands alors on return rien.
    if (!interaction.isChatInputCommand()) return;

    // La variable command sert a verifier si ce que nous avons tapé comme slash command correspond au nom de la command que vous avons defini plus tot.
    const command = interaction.client.commands.get(interaction.commandName);

    // Si command renvoie undefined alors un message d'erreur apparait.
    if (!command) {
        console.error(`Aucune commande correspondant à ${interaction.commandName} n'a été trouvée.`);
        return;
    }


    // Le try and catch permet de gerer les cas de l'erreur.
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            // ephemeral permet de d'afficher le message d'erreur uniquement a la personne concerné par l'erreur sur le serveur.
            await interaction.followUp({
                content: 'Une erreur s\'est produite lors de l\'exécution de cette commande !',
                ephemeral: true
            });
        } else {
            await interaction.reply({
                content: 'Une erreur s\'est produite lors de l\'exécution de cette commande !',
                ephemeral: true
            });
        }
    }
});


client.once(Events.ClientReady, readyClient => {
    console.log(`Connecté sur le login ${client.user.tag}`)
})


client.login(token)