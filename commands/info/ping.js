const {MessageEmbed} = require('discord.js');
module.exports={
    name: 'ping',
    category: 'info',
    description: 'Returns the latency of the bot.',
    run: async(bot,message,args)=>{
        const msg = await message.channel.send('🏓 Pinging...')
        const embed = new MessageEmbed()
        .setTitle("🏓Pong!🏓")
        .setDescription(`**The Bot Latency is** ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms\n** The API Latency** is ${Math.round(bot.ws.ping)}ms`)
        .setColor('#ff0000')
        // msg.edit("", embed);
        msg.delete()
      message.channel.send(embed)
    }
}