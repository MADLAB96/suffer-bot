'use strict';
var commando = require("discord.js-commando");
var heros = require(process.cwd() + '/data/dotaheros.json').heros;

module.exports = class DotaPicker extends commando.Command {
    constructor(client) {
        super(client, {
            name: "dotapicker",
            description: "get a random dota hero",
            group: 'fun',
            aliases: ["heropicker", "dota", "picker", "dotapicker"],
            memberName: "dotapicker",
            examples: ["computer heropicker", "computer heropicker randomDraft"],
            args: [{
                key: 'gamemode',
                prompt: 'say the game mode: allpick (default), randomDraft (3 heros)',
                type: 'string',
                default: 'allpick'
            }]
        });
    }
    async run(msg, args) {
        switch(args.gamemode) {
            case 'allpick': 
                msg.channel.send(`${msg.author} will play ${heros[Math.random() * heros.length].localized_name}`);
            case 'randomDraft':
                msg.channel.send(`${msg.author} will chose from
                            ${heros[Math.random() * heros.length].localized_name}
                            ${heros[Math.random() * heros.length].localized_name}
                            ${heros[Math.random() * heros.length].localized_name}`);
            default:
                msg.channel.send(`Invalid game mode, pick from: allpick (default), randomDraft (3 heros)`);
        }
    }
}