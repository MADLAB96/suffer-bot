'use strict';
var commando = require("discord.js-commando");
var heroes = require('../../../data/dotaheros.json').heroes;

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
	// heroes = heroes.heroes;
        switch(args.gamemode) {
            case 'allpick':
		let i = Math.floor(Math.random() * heroes.length);
		msg.channel.send(`${msg.author} will play ${heroes[i].localized_name}`);
		break;
            case 'randomDraft':
		let hero1 = heroes[Math.floor(Math.random() * heroes.length)].localized_name;
		let hero2 = heroes[Math.floor(Math.random() * heroes.length)].localized_name;
		let hero3 = heroes[Math.floor(Math.random() * heroes.length)].localized_name; 
                msg.channel.send(`${msg.author} will chose from ${hero1}, ${hero2}, ${hero3}`);
            	break;
	    default:
                msg.channel.send(`Invalid game mode, pick from: allpick (default), randomDraft (3 heros)`);
		break;
        }
    }
}
