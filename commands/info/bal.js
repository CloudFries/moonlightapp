const {MessageEmbed} = require('discord.js');
const database = require('quick.db');
module.exports={
    name: 'bal',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{
      
      const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
      
      if(args[1]) return message.reply("Please enter valid arguments.")
      
      let coins = database.get(`coins_${message.guild.id}_${user.id}`)
      let bank = database.get(`bank_${message.guild.id}_${user.id}`)
      
      if(coins === null){
        coins = 0;
      }
      
      if(bank === null){
        bank = 0;
      }
      
      const embed = new MessageEmbed()
      .setAuthor(user.user.username, user.user.displayAvatarURL())
      .addField("Cash:", `**${coins}** 💸`)
      .addField("Bank:", `**${bank} 🏦**`)
      .addField("Networth:", `**${bank + coins} 💰**`)
      .setColor("#00ff44");
      
      message.channel.send(embed);
    }
}