const Discord = require('discord.js');
require('dotenv').config();

const bot = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.GuildMembers,
    ]
});

const token = process.env.TOKEN_DISCORD;
const channelId = process.env.CHANEL_ID;


bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}`);
});

bot.on('messageCreate', async(message) => { 
    // verifica se a mensagem foi enviada no canal permitido
    if (message.channel.id !== channelId) {
        return;
    }

    // Checa se a mensagem foi enviada por um bot
    if (message.author.bot) return;
    // Checa se o comando correto foi utilizado
    if (message.content.toLowerCase().startsWith('!jogos')) {
        // Separa a mensagem em um array, ignorando o comando
        const jogos = message.content.slice(7).split(',').map(jogo => jogo.trim());

        // Faz algo com os jogos informados
        console.log(jogos);
        const indexAleatorio = Math.floor(Math.random() * jogos.length);
        const jogoSelecionado = jogos[indexAleatorio];
        const channel = message.channel;
        const botMessage = await channel.send(`O jogo sorteado foi: ${jogoSelecionado}`);

        setTimeout(() => {
            message.channel.messages.delete(message)
              .then(() => console.log(`Mensagem ${message.id} excluída com sucesso`))
              .catch(console.error);

              botMessage.delete()
              .then(() => console.log(`Mensagem ${message.id} excluída com sucesso`))
              .catch(console.error);
          }, 30000);

    }

    if(message.content.toLowerCase().substring(0, 6) !== '!jogos'){
        setTimeout(() => {
            message.channel.messages.delete(message)
              .then(() => console.log(`Mensagem ${message.id} excluída com sucesso`))
              .catch(console.error);
            }, 2000);
    }
});


bot.login(token);