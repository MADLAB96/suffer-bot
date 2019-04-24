'use strict';
var _request = require('request');
var commando = require("discord.js-commando");
var {Attachment} = require('discord.js');

module.exports = class BeHumble extends commando.Command {
    constructor(client) {
        super(client, {
            name: "behumble",
            description: "hebumble",
            group: 'response',
            memberName: "behumble",
            examples: ["!behumble"],
        });
    }
    async run(msg) {
        const hum = new Attachment('./data/humble.gif');
        msg.channel.send(hum);
    }
}
