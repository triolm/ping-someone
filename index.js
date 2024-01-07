const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
require('dotenv').config();


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {
    if (message.content.trim().toLowerCase() == "!reconfig") {
        reconfig(message.guild)
        await message.channel.send("Reset roles.");
    }
    if (message.content.includes("<@&")) {
        role = resetRole("someone", message.guild)
        if (message.content.includes(`<@&${role.id}>`)) {
            members = await message.guild.members.fetch();
            rando = members.random();
            await message.channel.send(`<@${rando.id}>`)
        }
    }
});

reconfig = (guild) => {
    resetRole("someone", guild)
    resetRole("no one", guild)

}

resetRole = (roleName, guild) => {
    let role = guild.roles.cache.find(x => x.name === roleName);
    if (!role) {
        guild.roles.create({
            name: roleName,
            reason: 'Empty roleName role for people to tag',
            permissions: []
        })
    } else {
        role.members.forEach((member) => member.roles.remove(role));
    }
    return role
}

client.login(process.env.TOKEN); 
