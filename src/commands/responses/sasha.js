'use strict';
var _request = require('request');
var commando = require("discord.js-commando");
var {Attachment} = require('discord.js');

module.exports = class Sharren extends commando.Command {
    constructor(client) {
        super(client, {
            name: "sasha",
            description: "sasha",
            group: 'response',
            memberName: "sasha",
            examples: ["!sasha"],
        });
    }
    async run(msg) {
        const sasha = new Attachment('./data/sasha.gif');
        msg.channel.send(sasha);
    }
}
