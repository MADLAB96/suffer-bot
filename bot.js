'use strict';

var {Client, Attachment} = require('discord.js');
// var client = new Client();
var logger = require('winston');
var auth = require('./auth.json');
var filter = require('./filter.js');
var _request = require('request');
var songs = require("./data/songs.json");
var commando = require("discord.js-commando");
var path = require('path');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

const client = new commando.Client({
    owner: '209463572395196417',
    commandPrefix: "~"
});

client.on('ready', function (evt) {
    var list = [];
    client.channels.forEach(channel => {
        list.push(channel.name)
    });
    logger.info('Connected to: ' + list);
    logger.info('Started.');
});

client.on('message', function (msg) {
    filter(msg);
    // NO jasp
    // if (msg.author.username === "Jasper") {
    //     msg.channel.send('@Jasper#9254 *shhh*');
    //     msg.delete();
    // } else
    if (msg.content.substring(0, 1) == '!') {
        var args = msg.content.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);

        switch(cmd) {
            case 'source':
                msg.channel.send(`${msg.author} https://github.com/MADLAB96/suffer-bot`);
                break;
            case 'help':
                msg.channel.send(`I can't even help myself :gun:`);
                break;
            case 'sharren':
                msg.channel.send('why did she leave me :cry:');
                break;
            case 'karen':
                msg.channel.send(':100: if she breaths :100:');
                break;
            case 'oceanman':
                msg.channel.send("https://www.youtube.com/watch?v=6E5m_XtCX3c");
                break;
            case 'water': 
                const water = new Attachment('./data/water.jpg')
                msg.channel.send(water);
                break;
            case 'rocket': 
                msg.channel.send(`((_)=======D~~~~~`);
                break;
            case 'noid':
                msg.channel.send(`*${songs.noid}*`, { tts: true });
                break;
            case 'swang':
                msg.channel.send(`https://youtu.be/lg_sd_EpTDs`);         
                break;   
            default:
                msg.channel.send('Unknown Command :b:ussy');
        }
    } 
});

client.registry
        .registerGroup('fun', 'Fun')
        .registerDefaults()
        .registerCommandsIn(path.join(__dirname, './src/commands'));

// authentication
client.login(auth.token);
