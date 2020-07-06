const {MessageEmbed} = require('discord.js');
const database = require('quick.db')
module.exports={
    name: 'new',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{
      
                  const errorEmbed = new MessageEmbed()
      .setTitle("Error!")
         .setDescription("You did not specify a time!")
         .setColor("RED")
         .setTimestamp()
      
      let supportCategory = database.get(`tickets_${message.guild.id}`)
    if(supportCategory === null) {
        return message.channel.send(errorEmbed.setDescription("There is no Ticket Category set! You can set this by using `setcat (Category ID)`"))
      }
      
      let channelName = `ticket-${message.author.username}`.toLowerCase()
      let reason = args.slice(0).join(" ");
      if(!reason) {
        reason = "No reason was provided"
      }
      
      if(message.guild.channels.cache.some(channel =>
          channel.topic === `Ticket Owner: <@${message.author.id}>`)) { 
        message.reply("**You already have a ticket open!**")
      } else {
        
      const sr = database.get(`staff_${message.guild.id}`)
      if(sr === null | 0) return message.reply("There is no Ticket Staff role set for this server!")
      
      message.guild.channels.create(channelName, { parent: supportCategory, topic: `Ticket Owner: <@${message.author.id}>` }).then(c => {
        const everyone = message.guild.roles.cache.find(role => role.name === "@everyone")
        c.updateOverwrite(sr, {
          SEND_MESSAGES: true,
          VIEW_CHANNEL: true,
        });
        c.updateOverwrite(everyone, {
          SEND_MESSAGES: false,
          VIEW_CHANNEL: false,
          MENTION_EVERYONE: false,
        });
        c.updateOverwrite(message.author, {
          SEND_MESSAGES: true,
          VIEW_CHANNEL: true,
        });
        
        let embed = new MessageEmbed()
        .setColor("GREEN")
        .setTitle("Ticket Created")
        .setDescription(`<@${message.author.id}> Your support ticket channel is <#${c.id}>`)
        .setTimestamp()
        .setFooter("Made by Cloud", "https://cdn.discordapp.com/avatars/290143878315507712/7d6d046b57434d346a7bddacea80e25e.webp")
        message.channel.send(embed)
        
        let wEmbed = new MessageEmbed()
        .setColor("BLUE")
        .setTitle("Support Ticket")
        .setDescription(`**__Thanks for opening a ticket! Support will be with you shortly.__**\n\n**Ticket Owner:** ${message.author}\n\n**Reason:** ${reason}`)
        // .addField("Ticket Owner:", `<@${message.author.id}>`)
        .setTimestamp()
        .setFooter("Made by Cloud", "https://cdn.discordapp.com/avatars/290143878315507712/7d6d046b57434d346a7bddacea80e25e.webp")
        
        c.send(`${message.author}, here is your ticket!`)
        c.send(wEmbed)
        
        database.add(`ticketAmt_${message.guild.id}`, 1)
        database.add(`opentickets_${message.guild.id}`, 1)
        
      }).catch(console.error);
      }
  }
    }