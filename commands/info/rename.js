const {MessageEmbed} = require('discord.js');
const database = require('quick.db');
module.exports={
    name: 'rename',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{ 
      
            const errorEmbed = new MessageEmbed()
      .setTitle("Error!")
         .setDescription("You did not specify a time!")
         .setColor("RED")
         .setTimestamp()
            
      let role = database.get(`staff_${message.guild.id}`)
      if(role === null || 0) return message.channel.send(errorEmbed.setDescription("This guild does not have its Ticket Staff role set!"))
      if(!message.member.roles.cache.has(role)) return message.channel.send(errorEmbed.setDescription("You do not have the ticket staff role!"))
      
      let ticketCat = database.get(`tickets_${message.guild.id}`)
      
      if (message.channel.parentID !== ticketCat) {
        return message.channel.send(errorEmbed.setDescription("This command can only be used in tickets!"))
}
      
      if(ticketCat === null) {
        return message.channel.send(errorEmbed.setDescription("There is no Ticket Category set! You can set this by using `setcat (Category ID)`"))
      }
      
      let name = args.slice(0).join(" ");
      if(!name) return message.channel.send(errorEmbed.setDescription("Please provide a name for the ticket"))

      if(name.includes("?")) {
        return message.channel.send(errorEmbed.setDescription('You cannot include special characters in the name'))
      }
      
//       let role = database.get(`staff_${message.guild.id}`)
//   let backup = message.guild.roles.cache.find(role => role.name === "Ticket Staff");
//   if(role === null || 0) return message.channel.send(errorEmbed.setDescription("This guild does not have its Ticket Staff role set!"))
      
      const embed = new MessageEmbed()
      .setTitle("Ticket Renamed!")
      .setDescription(`I have renamed the ticket to **${name}**`)
      .setColor("GREEN")
      .setTimestamp()
      
      message.channel.send(embed)
      message.delete()
      message.channel.setName(name)
    }
}