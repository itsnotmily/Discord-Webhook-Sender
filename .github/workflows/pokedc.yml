const axios = require('axios');

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

if (!DISCORD_WEBHOOK_URL) {
  console.error('DISCORD_WEBHOOK_URL is not set. Add it as an environment variable.');
  process.exit(1);
}

async function getRandomPokemon() {
  const randomId = Math.floor(Math.random() * 1000) + 1;

  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    const pokemon = response.data;
    const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    const officialArtworkUrl = pokemon.sprites.other['official-artwork'].front_default;

    const discordPayload = {
      content: `🎨 Today's Pokémon is **${pokemonName}**!`,
      embeds: [
        {
          title: `Meet ${pokemonName}!`,
          description: `Check out the official artwork for ${pokemonName}.`,
          image: { url: officialArtworkUrl },
          color: 0x1e90ff,
        },
      ],
    };

    await axios.post(DISCORD_WEBHOOK_URL, discordPayload);
    console.log(`Notification sent for ${pokemonName}!`);
  } catch (error) {
    console.error('Error fetching Pokémon or sending webhook:', error.message);
  }
}

getRandomPokemon();
