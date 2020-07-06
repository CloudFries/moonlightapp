const {MessageEmbed} = require('discord.js');
module.exports={
    name: 'joke',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{
        let replies = ['Why does a duck have feathers? ||To cover its butt quack.||', "I'm so good at sleeping, I can do it with my eyes closed.", "Why is Peter Pan always flying? ||Because he neverlands.||", "Why did the old man fall in a well? ||Because he couln't see that well.||", "Did you hear about that Italian chef that died? ||He pasta way.||", "Why couldn't the bicycle stand up? ||Because it was two tired.||", "Parallel lines have so much in common. It's a shame they'll never meet.", "What did one hat say to the other? ||You stay here. I'll go on ahead.||", "What did the left eye say to the right eye? ||Between you and me, something smells.||"]
        let result = Math.floor((Math.random() * replies.length));
        
        message.channel.send(replies[result]);
    }
}