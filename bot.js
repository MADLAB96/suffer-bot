#!/usr/bin/env node
'use strict';

var auth = require('./auth.json');
var commando = require("discord.js-commando");
var path = require('path');

const client = new commando.Client({
    owner: '209463572395196417',
    commandPrefix: "!"
});

client.on('ready', function (evt) {
    var list = [];
    client.channels.forEach(channel => {
        list.push(channel.name)
    });
    console.log('connected to:', list);
    console.log('Started');
});

client.registry
        .registerGroup('fun', 'Fun')
        .registerGroup('response', 'Response')
        .registerDefaults()
        .registerCommandsIn(path.join(__dirname, './src/commands'));

// authentication
client.login(auth.token);
