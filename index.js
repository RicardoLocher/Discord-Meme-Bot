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
    let words = message.content.toLowerCase().split(" ");
    if (!message.author.bot){
        if (words.length === 1) {
            switch (words[0]) {
                case 'meme':
                    message.reply('type !meme to query one');
                    break;
    
                case '!meme':
                    let data = await fetch("https://meme-api.com/gimme/memes").then(response => response.json());
                    message.channel.send(data.url);
                    break;
    
                case '!codememe':
                    let data2 = await fetch("https://meme-api.com/gimme/ProgrammerHumor").then(response => response.json());
                    message.channel.send(data2.url);
                    break;

                case '!github':
                    message.reply('My source code is at: https://github.com/RicardoLocher/Discord-Meme-Bot')
                    break;
                
                case '!help':
                    message.reply('Commands: \n !meme \n !codememe \n !github \n or click here for a full list of commands: \n https://github.com/RicardoLocher/Discord-Meme-Bot/blob/main/README.md');
                    break;
            }
        }

        else if(words.length === 2){
            if(words[0] === "!meme" && typeof parseInt(words[1]) === 'number'){
                if(words[1] > 4){
                    message.reply('The number of memes is too high');
                }
                else{
                    let data3 = await fetch(`https://meme-api.com/gimme/memes/${words[1]}`).then(response => response.json());
                    for (let i = 0; i < words[1]; i++) {
                        message.channel.send(data3.memes[i].url);
                    }
                }
            }
            else if(words[0] === "!codememe" && typeof parseInt(words[1]) === 'number'){
                if(words[1] > 4){
                    message.reply('The number of memes is too high');
                }
                else{
                    let data3 = await fetch(`https://meme-api.com/gimme/ProgrammerHumor/${words[1]}`).then(response => response.json());
                    for (let i = 0; i < words[1]; i++) {
                        message.channel.send(data3.memes[i].url);
                    }
                }
            }
        }
    };
});

client.login(process.env.DISCORD_TOKEN);