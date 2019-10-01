#!/usr/bin/env node
'use strict';

var auth = require('./auth.json');
var commando = require('discord.js-commando');
var path = require('path');
var tmi  = require('tmi.js');

const client = new commando.Client({
    owner: '209463572395196417',
    commandPrefix: '!'
});

const twitchOpts = {
    identity: {
        username: 'suffer-bot',
        password: auth.twitch
    },

    channels: [
        'Madlab96'
    ]
}

const twitchClient = new tmi.client(twitchOpts);

twitchClient.connect();

twitchClient.on('message', (target, context, msg, self) => {
    console.log('new msg:', msg);
    if(msg.trim().slice(0, 1) === '!') {
        console.log('prefix !::');
    }
    if(msg.includes('society') || msg.includes('joker') || msg.includes('we')) {
        twitchClient.say(target, 'gamer word');
    }
    if(msg.includes('nagger')) {
        twitchClient.say(target, 'ayy');
    }
});


twitchClient.on('connected', (addr, port) => {
    console.log(`* Connected to ${addr}:${port}`);
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
