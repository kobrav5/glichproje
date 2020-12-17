const Discord = require('discord.js');

exports.run = async(client, message, args) => {
let miran = args.slice(0).join(' ');
if(!miran) return message.channel.send("Neyi taklit edeceğim?")
message.delete()
message.channel.send(miran)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [""],
  permLevel: 0
};

exports.help = { 
  name: 'taklit', 
  description: '',
  usage: 'temizle <miktar>',
  kategori: 'kullanıcı'
};