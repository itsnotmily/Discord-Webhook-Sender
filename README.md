# **Discord Webhook Sender**

🚀 A simple Node.js project to send automated messages to Discord channels using **webhooks**. This project is perfect for daily or hourly notifications, and can be customized for various use cases such as sending Pokémon updates, reminders, logs, or any other automated content.

---

## **Features**

- 📤 Sends beautifully formatted messages to Discord channels via webhooks.
- 🕒 Supports automated triggers every day or every hour (configurable via GitHub Actions).
- 🎨 Rich embeds with customizable content, images, and colors.
- 🔒 Securely integrates with Discord webhooks.

---

## **How It Works**

1. **Random Pokémon Notifications**:
   - Fetches random Pokémon data (name, number, type, height, weight, and official artwork) using the [PokeAPI](https://pokeapi.co/).
   - Sends the Pokémon details to a Discord channel using a webhook.

2. **Automation via GitHub Actions**:
   - Configured to run daily or hourly based on the project.
   - Automates message delivery without manual intervention.

---

## **Setup Instructions**

### Prerequisites
- Node.js installed on your system.
- A Discord webhook URL (learn how to create one [here](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)).

### Local Development
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/Discord-Webhook-Sender.git
   cd Discord-Webhook-Sender
2. **Navigate to the pokemon Directory:**
   ```bash
   cd pokemon

3. **Set Your Webhook URL:**
   ```bash
   DISCORD_WEBHOOK_URL=YOUR_DISCORD_WEBHOOK_URL

4. **Install Dependencies:**
    ```bash
    npm install axios
5. **Run the Script:**
   ```bash
   node pokemon.js
   
## Automation via GitHub Actions

This project uses GitHub Actions to run the script automatically.

1. Trigger Frequency:
   • Daily Trigger: Sends a message every day at 9 AM GMT.
   • Manual Trigger: Sends a message when triggered (optional).

2. Setup Instructions:
   • The workflow is defined in .github/workflows/pokemondiscord.yml.
   • No additional configuration is required unless you modify the schedule.

3. Secure Webhook URL:
   • Set the webhook URL as a GitHub Actions secret:
   • Navigate to your repository's Settings > Secrets and variables > Actions.
   • Add a new secret called DISCORD_WEBHOOK_URL and paste your webhook URL.
    
## Customization

   • You can customize the script to send different types of notifications.
   • Replace the Pokémon logic with your own data source or API.
   • Modify the Discord embed formatting to suit your needs.

## Example Output

Here’s an example of what a Pokémon notification might look like:

    🎨 Today's Pokémon is Pikachu!

        Number: #25
        Type(s): Electric
        Height: 0.4 m
        Weight: 6.0 kg

## Future Enhancements

    🌟 Add support for additional APIs or data sources.
    🔧 Add environment variable support for more configuration options.
    📅 Allow for custom scheduling intervals.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
Contributing

Feel free to fork this repository and submit pull requests! Contributions are welcome.
## Contact

Have questions or suggestions? Open an issue or contact me on GitHub.
