const {MessageEmbed} = require('discord.js');
const database = require('quick.db');
module.exports={
    name: 'close',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{ 
      
            const errorEmbed = new MessageEmbed()
      .setTitle("Error!")
         .setDescription("You did not specify a time!")
         .setColor("RED")
         .setTimestamp()
      
      let ticketCat = database.get(`tickets_${message.guild.id}`)
      
      if (message.channel.parentID !== ticketCat) {
        return message.channel.send(errorEmbed.setDescription("This command can only be used in tickets!"))
}
      
      if(ticketCat === null) {
        return message.channel.send(errorEmbed.setDescription("There is no Ticket Category set! You can set this by using `setcat (Category ID)`"))
      }
      
      let role = database.get(`staff_${message.guild.id}`)
  let backup = message.guild.roles.cache.find(role => role.name === "Ticket Staff");
  if(role === null || 0) return message.channel.send(errorEmbed.setDescription("This guild does not have its Ticket Staff role set!"))
      
      const embed = new MessageEmbed()
      .setTitle("Closing...")
      .setDescription("I am closing this ticket in 5 seconds...")
      .setColor("RED")
      .setTimestamp()
      
      const embedSend = await message.channel.send(embed)
      
      setTimeout(() => {
          embedSend.edit(" ", embed.setDescription("I am closing this ticket in 4 seconds..."))
            }, 1000);
      
      setTimeout(() => {
          embedSend.edit(" ", embed.setDescription("I am closing this ticket in 3 seconds..."))
            }, 2000);
      
      setTimeout(() => {
          embedSend.edit(" ", embed.setDescription("I am closing this ticket in 2 seconds..."))
            }, 3000);
      
      setTimeout(() => {
          embedSend.edit(" ", embed.setDescription("I am closing this ticket in 1 second..."))
            }, 4000);
      
      setTimeout(() => {
          message.channel.delete();
            }, 5000);
        
      database.subtract(`opentickets_${message.guild.id}`, 1)
    }
}