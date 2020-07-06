const {MessageEmbed} = require('discord.js');
const database = require('quick.db');
const ms = require('parse-ms');
module.exports={
    name: 'weekly',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{
      let cooldown = 6.048e+8,
          amount = 2500;
      
      let lastWeekly = await database.fetch(`lastWeekly_${message.guild.id}_${message.author.id}`);
      if (lastWeekly !== null && cooldown - (Date.now() - lastWeekly) > 0) {
        let timeObj = ms(cooldown - (Date.now() - lastWeekly));
        
        message.channel.send(`You have already collected this, please wait **${timeObj.days}d ${timeObj.hours}h ${timeObj.minutes}m ${timeObj.seconds}s!**`)
      } else {
        message.channel.send("You have successfully claimed your weekly reward of **$2000!**");
        
        database.set(`lastWeekly_${message.guild.id}_${message.author.id}`, Date.now());
        database.add(`coins_${message.guild.id}_${message.author.id}`, 2000);
      }
      
    }
}