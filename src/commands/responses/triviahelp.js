'use strict';
var commando = require("discord.js-commando");
const { RichEmbed } = require('discord.js');

const categoryCodes = {
    general: 9,
    books: 10,
    film: 11,
    music: 12,
    musicals: 13,
    television: 14,
    videoGames: 15,
    boardGames: 16,
    science: 17,
    computers: 18,
    mathematics: 19,
    mythology: 20,
    sports: 21,
    geography: 22,
    history: 23,
    politics: 24,
    art: 25,
    celebrities: 26,
    animals: 27,
    vehicles: 28,
    comics: 29,
    gadgets: 30,
    anime: 31,
    cartoons: 32
}


module.exports = class TriviaHelp extends commando.Command {
    constructor(client) {
        super(client, {
            name: "triviahelp",
            description: "triviahelp",
            group: 'fun',
            memberName: "triviahelp",
            examples: ["!triviahelp"],
        });
    }
    async run(msg) {
        msg.channel.send("**Available Categories:**\n" + Object.keys(categoryCodes).join(", "));
    }
}