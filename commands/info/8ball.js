const {MessageEmbed} = require('discord.js');
const database = require('quick.db')
module.exports={
    name: '8ball',
    category: 'info',
    description: 'Works just like an 8ball would',
    run: async(bot,message,args)=>{
        if(!args[2]) return message.reply("Please ask a full question.");
        let replies = ["Yes.", "No.", "I don't know.", "Concentrate and ask again.", "As I see it, yes.", "Ask again later.", "Better not tell you now.", "Cannot predict now.", "Don't count on it.", "It is certain.", "It is decidedly so.", "Most likely.", "My sources say no.", "My reply is no.", "Outlook not so good.", "Outlook good.", "Reply hazy, try again.", "Signs point to yes.", "Very doubtful.", "Without a doubt.", "Yes – definitely.", "You may rely on it."]
      
        let result = Math.floor((Math.random() * replies.length));
        let question = args.slice(0).join(" ");
      
        let Embed = new MessageEmbed()
        .setAuthor(message.author.tag)
        .setColor("RANDOM")
        .addField("Question", question)
        .addField("Answer", replies[result]);
      
        message.channel.send(Embed);
    }
}