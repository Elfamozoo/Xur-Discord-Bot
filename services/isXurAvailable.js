const run = require("./destinyApi");

const date = new Date('June 7, 2024 19:15:30');
console.log(date)
const xurIn = [0, 1, 6]


// La condition determine quand l'api sera utilisé selon les jours ou Xur est présent sur le jeu Destiny 2.
// On appelle la fonction run() du fichier destinyApi.js et on peut recuperer le nom de la location car on a mis un return sur la fonction initiale
module.exports = isXurAvailable = async () => {
    if (xurIn.includes(date.getDay()) || date.getDay() === 2 && date.getHours() < 19 || date.getDay() === 5 && date.getHours() >= 19) {
        const xurLocation = await run();
        return `Xur se trouve sur ${xurLocation}`
    } else {
        return "Xur n'est pas présent en orbite."
    }
}

// Ici pour traiter la promise envoyer j'effectue un .then afin de traiter l'information.
isXurAvailable().then((r) => {
    console.log(r)
});