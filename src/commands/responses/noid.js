'use strict';
var _request = require('request');
var commando = require("discord.js-commando");
var songs = require("../../../data/songs.json");

module.exports = class Noid extends commando.Command {
    constructor(client) {
        super(client, {
            name: "noid",
            description: "noid",
            group: 'response',
            memberName: "noid",
            examples: ["!noid"],
        });
    }
    async run(msg) {
        msg.channel.send(`*${songs.noid}*`, { tts: true });
    }
}