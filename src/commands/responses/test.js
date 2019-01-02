'use strict';
var commando = require("discord.js-commando");
const { RichEmbed } = require('discord.js');

module.exports = class Test extends commando.Command {
    constructor(client) {
        super(client, {
            name: "test",
            description: "test",
            group: 'fun',
            memberName: "test",
            examples: ["!test"],
        });
    }
    async run(msg) {
        const emb = new RichEmbed()
                .setTitle('emb')
                .setColor(0xFF0000)
                .setDescription('this is embedded');
        msg.channel.send(emb);
    }
}