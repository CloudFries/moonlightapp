const {MessageEmbed} = require('discord.js');
const database = require('quick.db');
const ms = require('parse-ms');
module.exports={
    name: 'work',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{
      
      const user = message.mentions.users.first() || message.author;
      
      
      let cooldown = 3.6e+6,
        amount = 200;
      
      let lastWork = await database.fetch(`lastWork_${message.guild.id}_${message.author.id}`);
      if (lastWork !== null && cooldown - (Date.now() - lastWork) > 0) {
        let timeObj = ms(cooldown - (Date.now() - lastWork));
        
        message.channel.send(`You have already worked, please wait **${timeObj.minutes}m ${timeObj.seconds}s** to work again!`)
      } else {
        
        const replies = ["You became a YouTuber", "You fixed a broken toilet at work", "You saved the day as a police officer and stopped a crime", "You sold lemonade", "You worked as a garbage collector.",  "You fished up a nice fish", "You became a farmer", "You became a miner and mined some nice minerals"]
        let result = Math.floor((Math.random() * replies.length));
      
        const amount = Math.floor(Math.random() * 100) + 150;
        
        message.channel.send(`${replies[result]} and recieved **$${amount}!**`);
        
        database.set(`lastWork_${message.guild.id}_${message.author.id}`, Date.now());
        database.add(`coins_${message.guild.id}_${user.id}`, amount)
      }
      
    }
}