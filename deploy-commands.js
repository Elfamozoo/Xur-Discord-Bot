const fs = require('node:fs');
const path = require('node:path');
// // REST est un module qui vous permet de faire facilement des requêtes REST à l'API Discord.
const {REST, Routes} = require('discord.js');
const {config} = require('dotenv')
config();
const token = process.env.DISCORD_TOKEN
const clientId = process.env.DISCORD_CLIENTID


const commands = [];
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
            // On recupere les data de command que l'on transforme en JSON.
            commands.push(command.data.toJSON());
        } else {
            // Sinon un message d'erreur s'enclenche.
            console.log(`[ALERTE] Il manque à la commande ${filePath} une propriété "data" ou "execute" requise.`);
        }
    }
}

// Construit et prepare l'instance du module REST qui utilise le token Discord.
const rest = new REST().setToken(token);

// async ici permet de traiter de manière asynchrone le code afin que le await puisse fonctionner.
(async () => {
    // Le try and catch permet de gerer les cas d'erreur.
    try {
        console.log(`Commence à rafraîchir les commandes d'application (/) de ${commands.length}.`);
        // La methode put est utilisé pour refresh les commands du bot avec le set de commands actuel.
        // await ici permet de d'éviter que le code passe directement vers la suite avant que data soit traiter.
        const data = await rest.put(
            Routes.applicationCommands(clientId),
            {body: commands},
        );
        console.log(`Rechargement réussi des commandes de l'application ${data.length} (/).`);
    } catch (error) {
        console.error(error);
    }
})();
