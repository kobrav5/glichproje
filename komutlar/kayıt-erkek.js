const db = require('quick.db');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')
exports.run = (client, message, args, member) => {
  if(message.channel.id !== ayarlar.kayıtchat) return message.channel.send('Bu komut sadece <#'+ayarlar.kayıtchat+"> kanalında kullanılabilir")
  const kayıtlı = message.guild.roles.cache.get(ayarlar.erkekrol); //buraya erkek rolünüzün id'sini koyun
  const kayıtlı2 = message.guild.roles.cache.get(ayarlar.erkekrol2);
  const misafir = message.guild.roles.cache.get(ayarlar.kayıtsız); //buraya misafir rolünüzün id'sini koyun.
  //const log = message.guild.channels.cache.get(ayarlar.kayıtlog); //buraya kayıt log id koyun
  const tag = ayarlar.tag;
  if (!message.member.roles.cache.has(ayarlar.kayıtsorumlusu)) return message.channel.send("Bu işlemi sadece Kayıt Sorumluları gerçekleştirebilir.")
  
    
    let üye = message.mentions.users.first() || client.users.cache.get(args.join(' '))
      if(!üye) return message.channel.send("Bir kullanıcı girin.")
    const c = message.guild.member(üye)
    const nick = args[1];
    const yas = args[2];
      if(!nick) return message.channel.send("Bir isim girin.")
      if(!yas) return message.channel.send("Bir yaş girin.")
    c.roles.add(kayıtlı)
    c.roles.add(kayıtlı2)
    c.roles.remove(misafir)
    .then(async msg => {
   setTimeout(() => {
                          c.setNickname(`${tag} ${nick} | ${yas}`)
                        }, 6000);
  })
  db.add(`kayıterkek_${message.author.id}`, 1)
  db.add(`kayıttoplam_${message.author.id}`, 1)
  db.set(`sonkayıt_${message.author.id}`, üye.id)

    const embed = new Discord.MessageEmbed()
    .setTitle(` Erkek Üye Kaydı Yapıldı!  `)
    .setDescription(`
${üye} adlı üyeye <@&${ayarlar.erkekrol}> rolünü verip ismini ${tag} ${nick} | ${yas} olarak ayarladım.
`)  

    .setFooter("Miran Kayıt Sistemi")
    .setColor("BLACK")
    return message.channel.send(embed)
    
  
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["e"],
  permLevel: 0
};
exports.help = {
  name: "erkek",
  description: "",
  usage: ""
};