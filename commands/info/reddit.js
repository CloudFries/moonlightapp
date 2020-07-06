const {MessageEmbed} = require('discord.js');
const randomPuppy = require('random-puppy');
const snekfetch = require('snekfetch');
const api = require('imageapi.js')
module.exports={
    name: 'reddit',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{
      
      const errorEmbed = new MessageEmbed()
      .setTitle("Error!")
      .setDescription("Please specify a subreddit!")
      .setColor("RED")
      .setTimestamp()
      
      let subreddit = args.slice(0).join(" ");
      if(!subreddit) return message.channel.send(errorEmbed)
      
      try {
        let img = await api(subreddit)
        
        const embed = new MessageEmbed()
        .setTitle(`A random image from r/${subreddit}`)
        .setColor("RANDOM")
        .setImage(img)
        .setURL(`https://reddit.com/r/${subreddit}`)
        
        message.channel.send(embed)
        
      } catch(err){
        message.channel.send(err)
      }
    }
}