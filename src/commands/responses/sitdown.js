'use strict';
var _request = require('request');
var commando = require("discord.js-commando");
var { Attachment } = require('discord.js');

module.exports = class SitDown extends commando.Command {
    constructor(client) {
        super(client, {
            name: "sitdown",
            description: "sitdown",
            group: 'response',
            memberName: "sitdown",
            examples: ["!sitdown"],
        });
    }
    async run(msg) {
        const hum = new Attachment('./data/sitdown.gif');
        msg.channel.send(hum);
    }
}