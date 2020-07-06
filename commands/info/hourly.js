const {MessageEmbed} = require('discord.js');
const database = require('quick.db');
const ms = require('parse-ms');
module.exports={
    name: 'hourly',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{
      let cooldown = 3.6e+6,
          amount = 30;
      
      let lastHourly = await database.fetch(`lastHourly_${message.guild.id}_${message.author.id}`);
      if (lastHourly !== null && cooldown - (Date.now() - lastHourly) > 0) {
        let timeObj = ms(cooldown - (Date.now() - lastHourly));
        
        message.channel.send(`You have already collected this, please wait **${timeObj.minutes}m ${timeObj.seconds}s!**`)
      } else {
        message.channel.send("You have successfully claimed your hourly reward of **$30!**");
        
        database.set(`lastHourly_${message.guild.id}_${message.author.id}`, Date.now());
        database.add(`coins_${message.guild.id}_${message.author.id}`, 30);
      }
      
    }
}