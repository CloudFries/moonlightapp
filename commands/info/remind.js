const {MessageEmbed} = require('discord.js');
const database = require('quick.db')
const ms = require('ms')
module.exports={
    name: 'remind',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{
      
      const errorEmbed = new MessageEmbed()
      .setTitle("Error!")
         .setDescription("You did not specify a time!")
         .setColor("RED")
         .setTimestamp()
      
      const successEmbed = new MessageEmbed()
      .setTitle("Reminder Set!")
         .setDescription(`test`)
         .setColor("GREEN")
         .setTimestamp()

      if(!args[0]) return message.channel.send(errorEmbed) 
      if(!args[0].endsWith("d")&&!args[0].endsWith("h")&&!args[0].endsWith("m")&&!args[0].endsWith("s")) return message.channel.send(errorEmbed.setDescription("That is not a valid time!"))
      if(isNaN(args[0][0])) return message.channel.send(errorEmbed.setDescription("That is not a number!"))
      const reminder = args.slice(1).join(" ");
      if(!reminder) return message.channel.send(errorEmbed.setDescription("What should I remind you of?"))
      
      message.channel.send(successEmbed.setDescription(`I will remind you in **${args[0]}** to **${reminder}**`))
      
            const embed = new MessageEmbed()
      .setTitle("Reminder!")
      .setDescription(`**Reminder:** ${reminder}\n**Server:** ${message.guild.name}`)
      .setColor("RANDOM")
      .setTimestamp()
      
      setTimeout(() => {
        message.author.send(embed)
      }, ms(args[0]))
    }
}