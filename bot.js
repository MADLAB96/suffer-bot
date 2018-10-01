var Discord = require('discord.js');
var client = new Discord.Client();
var logger = require('winston');
var auth = require('./auth.json');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

client.on('ready', function (evt) {
    logger.info('Connected');
});
client.on('message', function (msg) {
    if (msg.author.username === "Jasper") {
        msg.channel.send('@Jasper#9254 *shhh*');
        msg.delete();
    } 
    else
    if (msg.content.substring(0, 1) == '!') {
        var args = msg.content.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);

        switch(cmd) {
            // !ping
            case 'ping':
                msg.channel.send('Pong!')
                    .then(msg => logger.info(`Sent message replying to ${msg.author.id}.`));
                break;
            case 'source':
                msg.channel.send(`${msg.author} https://github.com/MADLAB96/suffer-bot`);
                break;
            default:
                msg.channel.send('Unknown Command :b:ussy');
            // Just add any case commands if you want to..
         }
    } 
});

client.login(auth.token);
