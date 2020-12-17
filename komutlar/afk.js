const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async(client, message, args) => {
var zaman = new Date().getTime()
var sebep = args.join(" ")
if(!sebep) sebep = "AFK"
db.set(`kullanicilar.${message.author.id}.afk`, `{"zaman": "${zaman}", "sebep": "${sebep}"}`)
message.channel.send(`<:tik:715506401568489523> Başarıyla **${sebep}** sebebiyle \`AFK\` moduna geçildi.`)

}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0,
  kategori: "Kullanıcı"
};

exports.help = {
  name: 'afk',
  description: 'AFK Moduna geçersiniz',
  usage: 'afk <sebep>'
};