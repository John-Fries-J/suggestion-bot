const Command = require('../../structures/Command');
const config = require('../../config.json');
const Discord = require('discord.js');

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'suggest',
        aliases: ["s", "sug"],
        description: `Suggest anything!`,
        category: 'Suggestions',
        cooldown: 20,
        botPermission: ["ADD_REACTIONS"]
      });
    }
    async run(message, args) {
      // Add a console log to log the command
      console.log(`Suggestion Sent by ${message.author.tag}`)
      //Check if the suggestion channel exists or has been given in the config
      let channel;
      if(config.suggestion_channel_id){
        channel = await message.guild.channels.cache.get(config.suggestion_channel_id)
      } else channel = await message.guild.channels.cache.find(c => c.name == "suggestions" && c.type == "text");

      if(!channel){
      return message.channel.send(`${message.client.emoji.fail} | I could not find the suggestion channel in the current guild.`)
      };
      //Check if the suggestion is empty
      const suggestion = args.slice(0).join(" ")
      if(!suggestion){
        return message.channel.send(`${message.client.emoji.fail} | What would you like to suggest?`)
      };
      //Create the suggestion embed
      const embed = new Discord.MessageEmbed()
      .setTimestamp()
      .setColor(message.client.color.blue)
      channel.send(embed)
      .then((s)=>{
      s.react('✅')
      s.react('❌')
      })
      .catch(()=>{
        return message.reply(`${message.client.emoji.fail} | Could not send a message to the suggestion Channel.`)
      });
      message.delete();
      return message.channel.send(`${message.client.emoji.success} | Successfuly sent your suggestion to ${channel}`)
      .then((s)=>{
        s.delete({timeout: 5000})
      })
      }
};
