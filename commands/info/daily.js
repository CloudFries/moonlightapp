const {MessageEmbed} = require('discord.js');
const database = require('quick.db');
const ms = require('parse-ms');
module.exports={
    name: 'daily',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{
      let cooldown = 8.64e+7,
          amount = 250;
      
      let lastDaily = await database.fetch(`lastDaily_${message.guild.id}_${message.author.id}`);
      if (lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0) {
        let timeObj = ms(cooldown - (Date.now() - lastDaily));
        
        message.channel.send(`You have already collected this, please wait **${timeObj.hours}h ${timeObj.minutes}m ${timeObj.seconds}s!**`)
      } else {
        message.channel.send("You have successfully claimed your daily reward of **$250!**");
        
        database.set(`lastDaily_${message.guild.id}_${message.author.id}`, Date.now());
        database.add(`coins_${message.guild.id}_${message.author.id}`, 250);
      }
      
    }
}