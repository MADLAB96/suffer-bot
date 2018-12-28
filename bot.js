'use strict';

var logger = require('winston');
var auth = require('./auth.json');
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
    commandPrefix: "!"
});

client.on('ready', function (evt) {
    var list = [];
    client.channels.forEach(channel => {
        list.push(channel.name)
    });
    logger.info('Connected to: ' + list);
    logger.info('Started.');
});

client.registry
        .registerGroup('fun', 'Fun')
        .registerGroup('response', 'Response')
        .registerDefaults()
        .registerCommandsIn(path.join(__dirname, './src/commands'));

// authentication
client.login(auth.token);
