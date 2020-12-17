const Discord = require("discord.js");
const client = new Discord.Client();
const express = require("express");
const app = express();
const http = require('http');
const fs = require("fs");
const ayarlar = require('./ayarlar.json')
const db = require('quick.db')
const moment = require('moment')
require("moment-duration-format");
app.get("/", (request, response) => {
  console.log("Bağlanıldı!");
  response.sendStatus(200);
});
app.listen(9172);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 120000)
//KOMUT Algılayıcı______________________________________________________________
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir("./komutlar/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let cmd = require(`./komutlar/${file}`);
    let cmdFileName = file.split(".")[0];
    client.commands.set(cmd.help.name, cmd);
    console.log(`Komut Yükleme Çalışıyor: ${cmdFileName}`);
    if (cmd.help.aliases) {
      cmd.help.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
    };
  });
});

//EVENTS Yükleyici_______________________________________________________________
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`Etkinlik Yükleme Çalışıyor: ${eventName}`);
    client.on(eventName, event.bind(null, client));
  });
});


client.on("ready", ()=> {
  console.log('BM - Satış Platformu | Bot Aktif!')
  client.user.setPresence({activity: {name: ayarlar.oynuyor, type:"WATCHING"}, status: "dnd"})
  //  client.user.setPresence({activity: {name:""}, status: "dnd"})

})
client.on("userUpdate", async (oldUser, newUser) => {

if (oldUser.username !== newUser.username) {
   
 let tag = ayarlar.tag            // taginiz
    
let sunucu = ayarlar.sunucuid;    //sunucu id niz
    
let kanal = ayarlar.taglog;        //log kanalı  orda mesaj atıcak
    
let rol = ayarlar.taglırol;             //tag alınınca verilcek rol

if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
      client.channels.cache.get(kanal).send(`${newUser} "${tag}" tagını aldığı için rolünü kazandı!`)
      client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol)
    } if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
      client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol)
      client.channels.cache.get(kanal).send(`${newUser} "${tag}" tagını çıkardığı için rolünü kaybetti!`)
}
}
});

client.on('guildMemberAdd', async(member) => {
  let rol = member.guild.roles.cache.get(ayarlar.otorol)
  
  await member.setNickname(`${ayarlar.tag} İsim | Yaş `)
  await member.roles.add(rol)

})
client.on("message", async msg => {
  if(!msg.guild) return
    const miran = [
      ".com",
      ".net",
      ".xyz",
      ".tk",
      ".pw",
      ".io",
      ".me",
      ".gg",
      "www.",
      "https",
      "http",
      ".gl",
      ".org",
      ".com.tr",
      ".biz",
      "net",
      ".rf.gd",
      ".az",
      ".party",
      "discord.gg"
    ];
    if (miran.some(word => msg.content.includes(word))) {
      try {
        if (!msg.member.permissions.has("ADMINISTRATOR")) {
msg.delete({ timeout: 10, reason: 'It had to be done.' });          return msg.channel
            .send(
              "Reklam yapamazsın! " +
                "<@!"+msg.author+">"
            )
            .then(a=>{
setTimeout(function(){
a.delete()
},6000)
})

          msg.delete(1);
        }
      } catch (err) {
        console.log(err);
      }
    }
  

});

client.on('message', message => {
let sa = message.content.toLowerCase()

if(sa === 'tag' || sa === '!tag') {
message.channel.send(ayarlar.tag)
}
})

client.on("guildMemberAdd", member => {
   let kırmızı = client.guilds.cache.get(ayarlar.sunucuid).emojis.cache.find(a=>a.id==="715506395197210624")
   let tik = client.guilds.cache.get(ayarlar.sunucuid).emojis.cache.find(a=>a.id==="715506401568489523")    
    let morsembol = client.guilds.cache.get(ayarlar.sunucuid).emojis.cache.find(a=>a.id==="715506395289747467")
    let google = client.guilds.cache.get(ayarlar.sunucuid).emojis.cache.find(a=>a.id==="715839086551629826")
    let kitap = client.guilds.cache.get(ayarlar.sunucuid).emojis.cache.find(a=>a.id==="715506391137386566")
    let kelebek = client.guilds.cache.get(ayarlar.sunucuid).emojis.cache.find(a=>a.id==="715506362167328778")
    let carpi = client.guilds.cache.get(ayarlar.sunucuid).emojis.cache.find(a=>a.id==="715506401484734504")
    // let deaktif = client.guilds.cache.get("708259598464712760").emojis.cache.find(a=>a.id==="712752260630970439")
    
  let guild = member.guild;
  let user = client.users.cache.get(member.id);
   
 
        let userinfo = {}
    userinfo.dctarih = moment.utc(member.guild.members.cache.get(user.id).user.createdAt).format(`DD|MM|YYYY`)
  const channel = member.guild.channels.cache.get(ayarlar.kayıtchat); /// Kayıt Kanalının Adını "" İçine Yazınız Örn:registry-chat
  if (!channel) return;
  let kullanıcı = client.users.cache.get(member.id)
  const kurulus = new Date().getTime()- kullanıcı.createdAt.getTime();
  let prime;
  if (kurulus < 1296000000) prime = `**Güvenilir Gözükmüyor!**`
  if (kurulus > 1296000000) prime = `**Güvenilir Gözüküyor!** ${tik}`
  

   userinfo.dctarih = moment.utc(member.guild.members.cache.get(user.id).user.createdAt).format(`DD  MMMM  YYYY dddd`)

   
        .replace("January", `Ocak`)
        .replace("February", `Şubat`)
        .replace("March", `Mart`)
        .replace("April", `Nisan`)
        .replace("May", `Mayıs`)
        .replace("June", `Haziran`)
        .replace("July", `Temmuz`)
        .replace("August", `Ağustos`)
        .replace("September", `Eylül`)
        .replace("October", `Ekim`)
        .replace("November", `Kasım`)
        .replace("December", `Aralık`)
     .replace("Monday", `**Pazartesi**`)
    .replace("Tuesday", `**Salı**`)
    .replace("Wednesday", `**Çarşamba**`)
    .replace("Thursday", `**Perşembe**`)
    .replace("Friday", `**Cuma**`)
    .replace("Saturday", `**Cumartesi**`)
    .replace("Sunday", `**Pazar**`)
  
  const embed = new Discord.MessageEmbed()
  
   .setColor('BLACK')
   .setThumbnail(`https://cdn.discordapp.com/attachments/708392017603985429/708609880080252989/MOSHED-2020-5-9-12-17-38.gif`)
   .setTitle(` Sunucuya Hoşgeldin!`)
   .setDescription(
   `  **Hoş geldin** <@${member.user.id}> **Seninle Beraber** **__${guild.memberCount}__** **Kişiyiz!** \n **Kaydının yapılması için gerçek adını vermen gerekli.** \n **<@&${ayarlar.kayıtsorumlusu}> Yetkilileri seninle ilgilenecektir.** \n **Tagımızı alarak bize destek olabilirsin.**\n  **Kayıt sorumluları gelene kadar beklemede kalın iyi eğlenceler.!**`
    )
   .addField(`Bu Kullanıcı Güvenilirmi?:`, prime)
  .addField(`**Hesap Kuruluş Tarihi**: `, userinfo.dctarih)
   .setFooter("Tarikat #EvdeKal!", guild.iconURL());
  let attach = new Discord.MessageAttachment('https://cdn.discordapp.com/attachments/708390767953182830/715169643991662672/Welcome-Black-Text-White-BG.gif');
 channel.send(`
 ${kırmızı} **Hoşgeldin** <@${member.user.id}> **Seninle** **${guild.memberCount}** **Kişiyiz!** ${tik}

 ${morsembol} **Sunucuya Kayıt Olmak İçin V.Confirmed Odalarındaın Birine Geçebilirsiniz** ${tik}

 ${google}** <@&${ayarlar.kayıtsorumlusu}> rolünde yetkililer seninle ilgilenecektir.**

 ${kitap}** Hesap Kuruluş Tarihi**: ${userinfo.dctarih}

 ${kelebek} Bu Kullanıcı ${prime}`,
new Discord.MessageAttachment('https://cdn.discordapp.com/attachments/715647233701183549/716364634692518018/giphy_39.gif') 
             )
//channel.send(attach)
});

//---------------------------------KOMUTLAR---------------------------------\\
client.on("message", async message => { //
  
  if (message.content === "!fake giriş") {
  //     if (!message.member.roles.cache.has('712303529162965054')) return message.channel.send("Yetkin yok.")

    client.emit(
      "guildMemberAdd",
      message.member || (await message.guild.fetchMember(message.author))
    );
    return message.channel.send(
      "**Başarıyla** test giriş mesajı **gönderildi**."
    );
  }
});
client.on("message", async message => {
  if (message.content === "!fake çıkış") {
 //   if (!message.member.roles.cache.has('712303529162965054')) return message.channel.send("Yetkin yok.")
    client.emit(
      "guildMemberRemove",
      message.member || (await message.guild.fetchMember(message.author))
    );
    return message.channel.send(
      "**Başarıyla** test çıkış mesajı gönderildi."
    );
  }
});

client.on(`ready`, async () => {
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
let guild = client.guilds.cache.get(ayarlar.sunucuid) // kanalın bulunduğu sunucu id
let online = guild.members.cache.filter(m => !m.user.bot && m.user.presence.status !== "offline").size;
  let offline = 
     `${online}`
     .split("")
     .map(c => mapping[c] || c)
     .join(" ")
  let toplam = guild.memberCount;
  let sunucu =
      `${toplam}`
      .split("")
      .map(c => mapping[c] || c)
      .join(" ") 
    let tagsayi = guild.members.cache.filter(m => m.user.username.includes(tags)).size
    let tag =
      `${tagsayi}`
      .split("")
      .map(c => mapping[c] || c)
      .join("")
let onnl = `**Toplam Üye:** ${sunucu}\n**Aktif Üye:** ${offline}\n**Tagdaki Üye:** ${tag}`
setInterval(() => {
client.channels.cache.get(`715647233701183549`).setTopic(onnl)
//(`${onnl.replace(`1`, `:one:`).replace(/2/, ` :two: `).replace(`3`, ` :three: `).replace(/4/, ` :four: `).replace(`5`, ` :five: `).replace(/6/, ` :six: `).replace(`7`, ` :seven: `).replace(/8/, ` :eight: `).replace(`9`, ` :nine: `).replace(/0/, ` :zero: `)}`) 
}, 3000);  })



//----------------------------------------------------------------------------------------------/
client.on("message", async(message) => {
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
let guild = client.guilds.cache.get(ayarlar.sunucuid) // kanalın bulunduğu sunucu id
let online = message.guild.members.cache.filter(m => !m.user.bot && m.user.presence.status !== "offline").size;
  let offline = 
     `${online}`
     .split("")
     .map(c => mapping[c] || c)
     .join(" ")
  let toplam = message.guild.memberCount;
  let sunucu =
      `${toplam}`
      .split("")
      .map(c => mapping[c] || c)
      .join(" ") 
    let tagsayi = message.guild.members.cache.filter(m => m.user.username.includes(tags)).size
    let tag =
      `${tagsayi}`
      .split("")
      .map(c => mapping[c] || c)
      .join("")
let onnl = `**Toplam Üye:** ${sunucu}\n**Aktif Üye:** ${offline}\n**Tagdaki Üye:** ${tag}`
message.guild.channels.cache.get(`715647233701183549`).setTopic(onnl)
//(`${onnl.replace(`1`, ` :one: `).replace(/2/, ` :two: `).replace(`3`, ` :three: `).replace(/4/, ` :four: `).replace(`5`, ` :five: `).replace(/6/, ` :six: `).replace(`7`, ` :seven: `).replace(/8/, ` :eight: `).replace(`9`, ` :nine: `).replace(/0/, ` :zero: `)}`) 
})


client.on("message", async (message, guild) => {
  var afk = db.get(`kullanicilar.${message.author.id}.afk`);
  if (!afk) return;
  var afkb = JSON.parse(afk);
  if (new Date().getTime() - afkb.zaman < 1000) return;
  db.delete(`kullanicilar.${message.author.id}.afk`);
  var süre = new Date().getTime() - afkb.zaman;
    var sürem = moment
      .duration(süre)
      .format("Y [yıl], M [ay], D [gün], H [saat], m [dakika], s [saniye]");
    message.channel.send(
      "<a:Beyaz:715839092780302336> | AFK modundan ayrıldınız. <@" +
        message.author.id +
        ">. Afk kaldığın süre:** " +
        sürem +
        "**"
    );
  

});
//
client.on("message", async (message, guild) => {
  let etiket = message.mentions.users.first();
  if (!etiket) return;
  var afaka = db.fetch(`kullanicilar.${etiket.id}.afk`);
  if (!afaka) return;
  var afk = JSON.parse(afaka);
  if (!afk) return;
  var süre = new Date().getTime() - afk.zaman;
    var sürem = moment
      .duration(süre)
      .format("Y [yıl], M [ay], D [gün], H [saat], m [dakika], s [saniye]");
    if (afk) {
      return message.channel.send(
        `<a:s_:712441668070277140> | **${etiket.tag}** adlı kullanıcı **${sürem}**dir **${afk.sebep}** sebebiyle afk!`
      );
    }
  
});
client.login(ayarlar.token);
