'use strict';
var _request = require('request');
var commando = require("discord.js-commando");

module.exports = class Squat extends commando.Command {
    constructor(client) {
        super(client, {
            name: "squat",
            description: "squat",
            group: 'response',
            memberName: "squat",
            examples: ["!squat"],
        });
    }
    async run(msg) {
        msg.channel.send(`https://www.youtube.com/watch?v=rGVCrvvLuOc`);
    }
}