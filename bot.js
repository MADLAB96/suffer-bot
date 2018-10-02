'use strict';

var {Client, Attachment} = require('discord.js');
var client = new Client();
var logger = require('winston');
var auth = require('./auth.json');
var filter = require('./filter.js');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

client.on('ready', function (evt) {
    var list = [];
    client.channels.forEach(channel => {
        list.push(channel.name)
    });
    logger.info('Connected to: ' + list);
    logger.info('Started.');
});

client.on('message', function (msg) {
    // var filteredMsg = filter(msg.content, msg);

    // NO jasp
    // if (msg.author.username === "Jasper") {
    //     msg.channel.send('@Jasper#9254 *shhh*');
    //     msg.delete();
    // }
    // else // text commands
    if (msg.content.substring(0, 1) == '!') {
        var args = msg.content.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);

        switch(cmd) {
            case 'ping':
                msg.channel.send('Pong!')
                    .then(msg => logger.info(`Sent message replying to ${msg.author}.`));
                break;
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
            default:
                msg.channel.send('Unknown Command :b:ussy');
        }
    } 
});

// authentication
client.login(auth.token);
