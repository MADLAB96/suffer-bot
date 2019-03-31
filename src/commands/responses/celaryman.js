'use strict';
var commando = require("discord.js-commando");
const { RichEmbed } = require('discord.js');

module.exports = class CeleryMan extends commando.Command {
    constructor(client) {
        super(client, {
            name: "celeryman",
            description: "celeryman",
            group: 'fun',
            memberName: "celeryman",
            examples: ["!celeryman"],
        });
    }
    async run(msg) {
        msg.channel.send("https://www.youtube.com/watch?v=THq4b1mnxcI");
    }
}