const Discord = require('discord.js');
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
exports.run = (client, message, args) => {
    if (!message.member.roles.cache.has(ayarlar.kayıtsorgu)) return message.channel.send("Bu işlemi sadece Kayıt Sorumluları gerçekleştirebilir.")
let üye = message.mentions.users.first() || message.author
//    db.add(`kayıtkız_${message.author.id}`, 1)
//  db.add(`kayıttoplam_${message.author.id}`, 1)
let toplam = db.fetch(`kayıttoplam_${üye.id}`)
let erkek = db.fetch(`kayıterkek_${üye.id}`)
let kız = db.fetch(`kayıtkız_${üye.id}`)
let sonkaydedilen = db.fetch(`sonkayıt_${üye.id}`)
let son = message.guild.members.cache.get(sonkaydedilen)
if(sonkaydedilen === null) son = "Bu kişi kimseyi kaydetmemiş."
if(toplam === null) toplam = 0
if(erkek === null) erkek = 0
if(kız === null) kız = 0
  let miran = new Discord.MessageEmbed()
  .setAuthor(`İşte ${üye.username} isimli kişinin kayıt etme bilgileri`)
  .setThumbnail(üye.avatarURL())

  .setDescription(`
Kaydedilen toplam üye sayısı : **${toplam}**

Kaydedilen toplam erkek üye sayısı : **${erkek}**

Kaydedilen toplam kadın üye sayısı : **${kız}**

Son kaydedilen üye : ${son}

`)
  .setFooter(message.author.username+` Tarafından İstendi`) 
  .setTimestamp()
  message.channel.send(miran)}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['kayıt-sorgu'],
    permLevel: 0
}
exports.help = {
    name: 'kayıtsorgu',
    description: 'İsmini yazdığınız emoji hakkında bilgi verir',
    usage: 'emojibilgi'
}
