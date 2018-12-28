'use strict';
var _request = require('request');
var commando = require("discord.js-commando");
var {Attachment} = require('discord.js');

module.exports = class Water extends commando.Command {
    constructor(client) {
        super(client, {
            name: "water",
            description: "water",
            group: 'response',
            memberName: "water",
            examples: ["!water"],
        });
    }
    async run(msg) {
        const water = new Attachment('./data/water.jpg');
        msg.channel.send(water);
    }
}