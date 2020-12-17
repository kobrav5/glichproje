const Discord = require("discord.js");
const ayarlar = require('../ayarlar.json')
const mapping = {
  " ": "   ",
   "0": "<a:sfr:716334188168609893>",
  "1": "<a:bir:716334043125252197>",
  "2": "<a:iki:716340644808753242>",
  "3": "<a:uc:716340664345821324>",
  "4": "<a:drt:716340682213556264>",
  "5": "<a:be:716340697502056470>",
  "6": "<a:alt:716340719274557450>",
  "7": "<a:yedi:716340734550212698>",
  "8": "<a:sekiz:716340754087149598>",
  "9": "<a:dokuz:716340773464834062>",
  "!": "❕",
  "?": "❔",
  "#": "#️⃣",
  "*": "*️⃣"
};
let tags = ayarlar.tag
"abcdefghijklmnopqr".split("").forEach(c => {
  mapping[c] = mapping[c.toUpperCase()] = `:regional_indicator_${c}:`;
});

exports.run = function(client, message, args) {
  
  let offlinesayi = message.guild.members.cache.filter(
    m => m.user.presence.status === "offline"
  ).size; 
  let offline = '**Çevrimdışı Kişi Sayısı** ' +
     `${offlinesayi}`
     .split("")
     .map(c => mapping[c] || c)
     .join(" ")
  let toplam = message.guild.memberCount;
  let sunucu = '**Sunucudaki Kişi Sayısı:** ' + 
      `${toplam}`
      .split("")
      .map(c => mapping[c] || c)
      .join(" ")
  let online = message.guild.members.cache.filter(m => !m.user.bot && m.user.presence.status !== "offline").size;;
  let offline2 =  '**Çevrimiçi Kişi Sayısı:** ' +
     `${online}`
     .split("")
     .map(c => mapping[c] || c)
     .join(" ")

  let tagsayi = message.guild.members.cache.filter(m => m.user.username.includes(tags)).size
    let tag = '**Tagdaki Kişi Sayısı:** ' +
      `${tagsayi}`
      .split("")
      .map(c => mapping[c] || c)
      .join("")
    let onnl = `**Toplam Üye:** ${sunucu}\n**Aktif Üye:** ${offline2}\n**Tagdaki Üye:** ${tag}`
client.channels.cache.get(`715647233701183549`).setTopic(onnl)
const embed = new Discord.MessageEmbed()
.setTitle('Sunucu İstatistikleri')
.setColor('BLACK')
.setDescription('' + sunucu + '\n \n' + offline2 + '\n \n' + offline + '\n \n'+ tag)
.setFooter('')

  message.channel.send(embed)

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["onlinesayi"],
  permLevel: 0
};

exports.help = {
  name: "say",
  usage: "Sunucudaki Online Kişileri Sayar",
  desscription: "say"
};