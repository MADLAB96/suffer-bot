'use strict';
var _request = require('request');
var commando = require("discord.js-commando");
var {Attachment} = require('discord.js');

module.exports = class BeHumble extends commando.Command {
    constructor(client) {
        super(client, {
            name: "syrup",
            description: "syrup",
            group: 'response',
            memberName: "syrup",
            examples: ["!syrup"],
            aliases: ["syrupsandwiches"]
        });
    }
    async run(msg) {
        const hum = new Attachment('./data/syrup.gif');
        msg.channel.send(hum);
    }
}
