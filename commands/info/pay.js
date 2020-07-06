const {MessageEmbed} = require('discord.js');
const database = require('quick.db');
module.exports={
    name: 'pay',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{
      
      if(args[2]) return message.reply("Invalid formatting!")
      if(!args[0]) return message.reply("Please mention someone to pay!");
      if(!args[1]) return message.reply("Please type an amount to pay!")
      
      const author = message.author;
      const payee = message.mentions.members.first() || message.guild.members.cache.get(args[0])
      const user = message.mentions.users.first() || message.author;
      
      if(payee.id === author.id) return message.reply("You cannot pay yourself!")
      
      let coins = database.get(`coins_${message.guild.id}_${author.id}`)
      
      if(args[1] > coins) return message.reply("You have insufficient funds for this!")
      
      database.subtract(`coins_${message.guild.id}_${author.id}`, args[1])
      database.add(`coins_${message.guild.id}_${payee.id}`, args[1])
      message.channel.send(`${author} has payed ${payee} **${args[1]}** coins!`);
    }
}