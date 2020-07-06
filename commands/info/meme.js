const {MessageEmbed} = require('discord.js');
const randomPuppy = require('random-puppy');
const snekfetch = require('snekfetch');
const api = require('imageapi.js')
module.exports={
    name: 'meme',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{
      let subreddits = [
        "memes",
        "meme",
        "dankmeme",
        "dankmemes",
        "teenagers"
      ]
      let subreddit = subreddits[Math.floor(Math.random()*(subreddits.length)-1)]
      let img = await api(subreddit)
      
      const embed = new MessageEmbed()
      .setTitle(`A meme from r/${subreddit}`)
      .setURL(`https://reddit.com/r/${subreddit}`)
      .setColor("RANDOM")
      .setImage(img)
      
      message.channel.send(embed)
    }
}