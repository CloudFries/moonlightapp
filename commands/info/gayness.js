const {MessageEmbed} = require('discord.js');
module.exports={
    name: 'gayness',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{
      let response = Math.floor(Math.random() * 100);
      let user = message.mentions.users.first() || message.author;
      
      let embed = new MessageEmbed()
      .setAuthor(user.username, user.displayAvatarURL())
      .setDescription(`:rainbow_flag: **${user.username}** is **${response}%** gay :rainbow_flag:`)
      .setColor("RANDOM");
      
      message.channel.send(embed);
    }
}