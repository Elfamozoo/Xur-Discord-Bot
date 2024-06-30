const {config} = require('dotenv')
const axios = require("axios");
config();

const token = process.env.DESTINY_TOKEN
const vendorsDefinitionFrEndpoint = "https://www.bungie.net/common/destiny2_content/json/fr/DestinyVendorDefinition-c2aab5db-09a6-4170-85dd-91599475546b.json"
const destinationDefinitionFrEndpoint = "https://www.bungie.net/common/destiny2_content/json/fr/DestinyDestinationDefinition-c2aab5db-09a6-4170-85dd-91599475546b.json"


// Avec Axios je fetch uniquement les informations qui m'intéresse du Json ici les infos de Xur.
// Ensuite je recupere le hash de la localisation que j'utilise pour fetch les informations de la dite localisation.
// Enfin je recupere le nom de la location via le 2eme appel api.
run = async () => {
    try {
        const vendorsResponse = await axios.get(vendorsDefinitionFrEndpoint)
        const xurInfos = vendorsResponse.data['2190858386']
        const locationHash = xurInfos.locations[0].destinationHash

        const destinationResponse = await axios.get(destinationDefinitionFrEndpoint)
        const xurLocation =  destinationResponse.data[locationHash]
        const locationName = xurLocation.displayProperties.description
    } catch (e) {
        console.log(e)
    }
}
run()



