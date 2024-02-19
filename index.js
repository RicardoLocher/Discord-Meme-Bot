import dotenv from 'dotenv';
dotenv.config();

import { Client, GatewayIntentBits } from 'discord.js';

const client = new Client({
    intents: [  GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages, 
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.MessageContent,
                "GuildMessages",
                "Guilds",
                "MessageContent"
            ],
});

client.on('messageCreate', async(message) => {
    if (!message.author.bot){

        switch (message.content.toLowerCase()) {
            case 'meme':
                message.reply('type !meme to query one');
                break;
            
            case 'ricardo kanns halt':
                message.reply('Das Stimmt');
                break;
        }
    };
});

client.login(process.env.DISCORD_TOKEN);