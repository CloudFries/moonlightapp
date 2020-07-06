const {MessageEmbed} = require('discord.js');
const database = require('quick.db');
module.exports={
    name: 'prefix',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{
      let prefix = database.get(`prefix_${message.guild.id}`)
      if (prefix === null || 0) prefix = "c!" 
      message.channel.send(`The prefix for this guild is **${prefix}**`);
    }
}