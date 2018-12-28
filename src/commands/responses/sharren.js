'use strict';
var _request = require('request');
var commando = require("discord.js-commando");

module.exports = class Sharren extends commando.Command {
    constructor(client) {
        super(client, {
            name: "sharren",
            description: "sharren",
            group: 'response',
            memberName: "sharren",
            examples: ["!sharren"],
        });
    }
    async run(msg) {
        msg.channel.send('why did she leave me :cry:');
    }
}