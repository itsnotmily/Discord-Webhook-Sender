const axios = require('axios');

// Your Discord webhook URL
const DISCORD_WEBHOOK_URL = 'DISCORD_WEBHOOK_URL';

// Function to get a random Pokémon from PokeAPI
async function getRandomPokemon() {
  // Generate a random number between 1 and 1000 (the number of Pokémon in PokeAPI)
  const randomId = Math.floor(Math.random() * 1000) + 1;

  try {
    // Make a request to PokeAPI for the random Pokémon
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    
    // Extract Pokémon name and official artwork
    const pokemon = response.data;
    const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1); // Capitalize name
    const officialArtworkUrl = pokemon.sprites.other['official-artwork'].front_default;

    // Create the message payload
    const discordPayload = {
      content: `🎨 Today's Pokémon is **${pokemonName}**!`,
      embeds: [
        {
          title: `Meet ${pokemonName}!`,
          description: `Check out the official artwork for ${pokemonName}.`,
          image: {
            url: officialArtworkUrl, // Pokémon official artwork
          },
          color: 0x1e90ff, // Optional: Embed color in hexadecimal
        },
      ],
    };

    // Send the message to the Discord webhook
    await axios.post(DISCORD_WEBHOOK_URL, discordPayload);

    console.log(`Notification sent for ${pokemonName} with official artwork!`);
  } catch (error) {
    console.error('Error fetching Pokémon or sending webhook:', error.message);
  }
}

// Call the function to get a random Pokémon and send the notification
getRandomPokemon();
