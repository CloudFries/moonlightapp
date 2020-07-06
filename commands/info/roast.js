const {MessageEmbed} = require('discord.js');
module.exports={
    name: 'roast',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{
        let user = message.mentions.users.first();
        if(!user) return message.reply("Please mention a user to roast.");
        let replies = ["You're so ugly, you made your Happy Meal cry.", "Were you born on the highway? Because that's where the most accidents happen.", "You remind me of the clouds because you disappear when it's a beautiful day.", "You only get taken out because you're trash.", "Were you fined for littering after getting dropped off at daycare?.", "Keep rolling your eyes, you might eventually find a brain.", "Everytime I see you, I get reminded to take out the trash.", "If you're gonna be two faced, at least make one of them pretty.", "My phone battery lasts longer than your relationships.", "I wish I was a magician because I want to make you disappear.", "You're as useless as the ueue in queue.", "Mirrors can't talk. Luckily for you, they can't laugh either.", "They say laughter is the best medicine. Your face must be curing the whole world.", "If I wanted to kill myself, I would climb up to your ego and jump down to your IQ.", "I'd give you a nasty look but you already have one.", "You're so fat you could sell shade."]
      
        let result = Math.floor((Math.random() * replies.length));
        
        message.channel.send(`${message.author} **has roasted** ${user}!\n"${replies[result]}"`);
    }
}