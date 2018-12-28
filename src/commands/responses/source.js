'use strict';
var _request = require('request');
var commando = require("discord.js-commando");

module.exports = class Source extends commando.Command {
    constructor(client) {
        super(client, {
            name: "source",
            description: "source",
            group: 'response',
            memberName: "source",
            examples: ["!source"],
        });
    }
    async run(msg) {
        msg.channel.send(`${msg.author} https://github.com/MADLAB96/suffer-bot`);
    }
}