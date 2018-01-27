const Discord = require('discord.js');
const low = require('lowdb')
const FileSync = require ('lowdb/adapters/FileSync')


const adapter = new FileSync('database.json');
const db = low(adapter);

db.defaults({xp: [], sugg: [], story: []}).write()

var bot = new Discord.Client();
var prefix = ("<");
var randnum = 0;
var storynumber = db.get('blagues').size().value();

bot.on('ready', () => {
    bot.user.setPresence({ game: { name: 'SNK - <help', type: 0}})
    console.log("Bot Ready !");
});

bot.login('NDA0Nzk3OTU4MzIwNTUzOTg1.DUt-Jg.jNqRpG7cQnQrrkGhkR9GEwWO8v4');


bot.on("guildMemberAdd", member => {
    let role = member.guild.roles.find("name", "brigade d'entrainement");
    member.guild.channels.find("name", "general").send(` Bonjour à vous  ${member.user.username} ! 

    Vous venez d'integrer le monde de Shingeki No Kyojin - FR,
    nous vous félicitions pour votre intégrations au brigades d'entraînements.
    
    D'ici quelques temps, vous devrez choisir un corps d'armée entre :
    -la garnison;
    -le bataillon d'exploration;
    -les brigades spéciales.

    Ne vous inquietez pas, la faction c'est juste pour le RP, histoire de s'amuser, vous aurez les même droits sur le 
    serveur quel que soit votre faction.
    Aussi, nous vous demandons de jouer le jeu et de choisir un pseudo de personnage en lien avec SNK
    
    Soyez poli et courtois, un français correct est demandé au minimum.
    Le respect est de vigueur, les propos rascistes, injure ou autre ne seront pas toléré.`)
    member.addRole(role)
});

bot.on("guildMemberAdd", member => { 
    if (message.content === prefix + "lol"){
        let role = member.guild.addroles.find("name", "test");
        member.guild.channels.find("name", "general")
        member.addRoles("roles" )


}})



bot.on('message', message => {

    var msgauthor = message.author.username;

    if(message.author.bot)return;

    if(!db.get("xp").find({username: msgauthor}).value()){
        db.get("xp").push({username: msgauthor, xp: 1}).write();
    }else{
        var userxpdb = db.get("xp").filter({username: msgauthor}).find('xp').value();
        console.log(userxpdb);
        var userxp = Object.values(userxpdb)
        console.log(userxp);
        console.log(`Nombre d'xp : ${userxp[1]}`)

        db.get("xp").find({username: msgauthor}).assign({username: msgauthor, xp: userxp[1] += 1}).write();

    }

    if (message.content === "jtm"){
        message.reply("ta gueule");
        console.log('jtm tagueule');

    }

    if (!message.content.startsWith(prefix)) return;
    var args = message.content.substring(prefix.length).split(" ");

    switch (args[0].toLowerCase()){


        case "newblague":
        var value = message.content.substr(10);
        var author = message.author.username.toString();
        var number = db.get('blagues').map('id').value();
        console.log(value);
        message.reply("Ajout de la blague a la base de données")

        db.get('blagues')
            .push({ story_value: value, story_author: author})
            .write();
        break;

        case "blagues" :

        story_random();
        console.log(randnum);

        var story = db.get(`blagues[${randnum}].story_value`).toString().value();
        var author_story = db.get(`blagues[${randnum}].story_author`).toString().value();
        console.log(story);

        message.channel.send(`${story} (Blague de ${author_story})`)
        break;


        case  "kick":

    if (!message.channel.permissionsFor(message.member).hasPermission("KICK_MEMBERS")){
        message.reply("Tu n'as pas le droit de kick ! ;)")
    }else{
        var memberkick = message.mentions.users.first();
        console.log(memberkick)
        console.log(message.guild.member(memberkick).kickable)
        if(!memberkick){
            message.reply("L'utilisateur n'existe pas !");
        }else{
            if(!message.guild.member(memberkick).kickable){
                message.reply("Utilisateur impossible a kick !");
            }else{
                message.guild.member(memberkick).kick().then((member) => {
                message.channel.send(`${member.displayName}a été kick du serveur !`);
            }).catch(() => {
                message.channel.send("Kick Refusé!")
            })
        }
    }}

    break;

    case  "ban":

    if (!message.channel.permissionsFor(message.member).hasPermission("BAN_MEMBERS")){
        message.reply("Tu n'as pas le droit de ban ! ;)")
    }else{
        var memberban = message.mentions.users.first();
        console.log(memberban)
        console.log(message.guild.member(memberban).bannable)
        if(!memberban){
            message.reply("L'utilisateur n'existe pas !");
        }else{
            if(!message.guild.member(memberban).bannable){
                message.reply("Utilisateur impossible a ban !");
            }else{
                message.guild.member(memberban).ban().then((member) => {
                message.channel.send(`${member.displayName}a été ban du serveur !`);
            }).catch(() => {
                message.channel.send("Ban Refusé!")
            })
        }
    }}

    break;

    case "sugg":

    var value = message.content.substr(6);
        var author = message.author.username.toString();
        var number = db.get('sugg').map('id').value();
        console.log(value);
        message.reply("La suggestion a bien été prise ajoutée dans les demandes !")

        db.get('sugg')
            .push({ story_value: value, story_author: author})
            .write();
        break;

        case "stats" : 

        var userMessageDB = db.get("xp").filter({username: msgauthor}).find("xp").value();
        var userXP = Object.values(userxpdb);
        var stats_embed = new Discord.RichEmbed()
            .setTitle(`Nombre de messages de : ${message.author.username}`)
            .addField("Messages", `${userXP[1]} messages`, true)
            .addField("Nom du membre", msgauthor, true)

            message.channel.send({embed: stats_embed});

    }
    

    if (message.content === prefix + "help"){
    var help_embed = new Discord.RichEmbed()
            .setColor('#D9F200')
            .addField("Fonctionnement des commandes", "Chaque membre possède les commande de son grade sur le discord ainsi que les commandes des grades inférieurs ")
            .addField("Commandes Brigade d'entrainement", "<réseaux Affiche les différents réseaux sociaux de la communauté SNK - FR")
            .addField("Commandes Bataillon d'exploration, Garnison et Brigades Spéciales ", "<sugg Envoyer une suggestion d'amélioration du serveur Discord.\n<stats Voir son nombre de messages sur le serveur. ")
            .addField("Commandes Esquade Livaï", "<admin Affiche les commandes Admin.")
            .setFooter("Crée par Alex_ et Eren Jäger")
        message.channel.sendEmbed(help_embed);
        console.log("Commande Help demandée"); 

    }

    if (message.content === prefix + "réseaux"){
        var réseaux_embed = new Discord.RichEmbed()
                .setColor('#D9F200')
                .addField("Site", "En construction")
                .addField("Twitter", "https://twitter.com/FR_SNK")
                .addField("Facebook", "https://www.facebook.com/Shingeki-no-kyojin-3-147624222254357/ \nhttps://www.facebook.com/SNKFrance/")
                .addField("Youtube", "https://www.youtube.com/channel/UCKzU9176ms-0z6Kmjpz2Onw")
                .addField("Partenaires", "https://twitter.com/BlaBla_Manga \nhttps://www.youtube.com/channel/UCMj7bG6yzvJAn1rfGN-kE9g")
                .setFooter("Crée par Alex_ et Eren Jäger")
            message.channel.sendEmbed(réseaux_embed);
            console.log("Commande réseaux demandée"); 
    
        }

        if (message.content === prefix + "admin"){
            if(!message.member.roles.some(r=>["Escuade Livaï","test"].includes(r.name)) )
            return message.reply("Vous n'êtes pas assez gradé pour utiliser cette commande !");
            
            var admin_embed = new Discord.RichEmbed()
                    .setColor('#D9F200')
                    .addField("Commandes Modération", "/kick @PseudoDuMembre\n/ban @PseudoDuMembre")
                    .setFooter("Crée par Alex_ et Eren Jäger")
                message.author.sendMessage(admin_embed);
                console.log("Commande Admin demandée"); 
        
        
    }

    if (message.content === prefix + "maj"){        
        var maj_embed = new Discord.RichEmbed()
                .setColor('#D2F200')
                .addField("Mise à jour","Serveur de test")
                .addField(":tools: Commandes ajoutées :tools: ", "27/01/2018 00:00")
                .addField("<stats", "Chaque message est désormais correctement comptabilisé dans les stats. :ok_hand:")
                .addField("Weebhooks", "Création d'un Weebhooks qui poste automatiquement les vidéos Youtube. :punch:")
                .addField("<pfc", "Ajout de la commande <pfc qui est totalement inutile mais j'avais envie, c'est pour un pierre feuille ciseau ! :x:")
                .addField("<pf", "Ajout de la commande <pf qui est totalement inutile mais j'avais envie, c'est pour un pile ou face ! :x:")               
                .addField("Etat des commandes", ":punch: = pas encore sur le discord SNK.\n:ok_hand:  =  Ok sur le discord SNK.\n:x: = Ne marche pas correctement.")

                .setFooter("Crée par Alex_")
            message.author.sendMessage(maj_embed);
            console.log("Commande maj demandée"); 
    
    
}

    

    if (message.content === prefix + "pfc"){
        random();
           
            if (randnum == 1){
                message.reply("pierre :poop: ");
                console.log(randnum);
            }

            if (randnum == 0){
                message.reply("feuille :herb: ");
                console.log(randnum);
            }

            if (randnum == 2){
                message.reply("ciseau :scissors: ");
                console.log(randnum);
            }

            


    }

    if (message.content === prefix + "msgstat"){
        var xp = db.get("xp").filter({username: msgauthor}).find('xp').value()
        var xpfinal = Object.values(xp);
        var xp_embed = new Discord.RichEmbed()
            .addField("Nombre de messages postés sur le Discord :", `${message.author.username} : ${xpfinal[1]} messages` )
        message.channel.send({embed: xp_embed});
        
    }

    if (message.content === prefix + "pf"){
        random_pf();
           
            if (randnum == 1){
                message.reply("face");
                console.log(randnum);
            }

            if (randnum == 0){
                message.reply("pile");
                console.log(randnum);
}}




});


function story_random(min, max) {
    min =Math.ceil(0);
    max = Math.floor(storynumber);
    randnum = Math.floor(Math.random() * (max - min) + min);
}


function random(min, max) {
    min = Math.ceil(0);
    max = Math.floor(2);
    randnum = Math.floor(Math.random() * (max - min +1) + min);

}

function random_pf(min, max) {
    min = Math.ceil(0);
    max = Math.floor(1);
    randnum = Math.floor(Math.random() * (max - min +1) + min);

}