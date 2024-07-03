const {config} = require('dotenv')
const axios = require("axios");
config();

const token = process.env.DESTINY_TOKEN
headerDestiny = "https://www.bungie.net/"
xurId = "2190858386"
const destinyManifest = 'https://www.bungie.net/Platform/Destiny2/Manifest/'

// Avec Axios je fetch uniquement les informations qui m'intéresse du Json ici les infos de Xur.
// Ensuite je recupere le hash de la localisation que j'utilise pour fetch les informations de la dite localisation.
// Enfin je recupere le nom de la location via le 2eme appel api.
run = async () => {
    try {
        const manifestResponse = await axios.get(destinyManifest)
        const vendorsDefinitionFrEndpoint = manifestResponse.data.Response.jsonWorldComponentContentPaths.fr.DestinyVendorDefinition
        const destinationDefinitionFrEndpoint = manifestResponse.data.Response.jsonWorldComponentContentPaths.fr.DestinyDestinationDefinition

        const vendorsResponse = await axios.get(`${headerDestiny}${vendorsDefinitionFrEndpoint}`)
        const xurInfos = vendorsResponse.data[xurId]
        const locationHash = xurInfos.locations[0].destinationHash

        const destinationResponse = await axios.get(`${headerDestiny}${destinationDefinitionFrEndpoint}`)
        const xurLocation = destinationResponse.data[locationHash]
        const locationName = xurLocation.displayProperties.description
    } catch (e) {
        console.log(e)
    }
}
run()



