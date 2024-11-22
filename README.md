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
2. **Install Dependencies:**
    ```bash
    npm install axios
3. **Set Your Webhook URL:

