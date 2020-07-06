const {MessageEmbed} = require('discord.js');
module.exports={
    name: 'epicness',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{
      let response = Math.floor(Math.random() * 100);
      let user = message.mentions.users.first() || message.author;;
      
      message.channel.send(`**${user.username}** is **${response}%**/100 on the epicness scale.`);
    }
}