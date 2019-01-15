'use strict';
var commando = require("discord.js-commando");
var _request = require('request');
var mtgMessage = require('../../util/mtgCard');

const FUZZY_URL = "https://api.scryfall.com/cards/named?fuzzy=";
const RANDOM_URL = "https://api.scryfall.com/cards/random";

module.exports = class MtgSearch extends commando.Command {
    constructor(client) {
        super(client, {
            name: "mtg",
            description: "search for mtg card",
            group: 'fun',
            aliases: ["mtg", "magic"],
            memberName: "mtg",
            examples: ["!mtg"],
            args: [
                {
                    key: 'cardName',
                    prompt: 'usage: !mtg <cardName>',
                    type: 'string',
                    default: 'random',
                    infinite: true
                },
            ]
        });
    }
    async run(msg, args) {
        console.log(args);
        if(args.cardName != "random") {
            let cardName = args.cardName.join("+");
            _request((FUZZY_URL + cardName), function(err, res, body) {
                console.log(body);
                if(err || res.statusCode != 200) {
                    msg.channel.send('Not Found.');                
                } else {
                    var cardObj = JSON.parse(body);
                    msg.channel.send(mtgMessage(cardObj));
                }
            });
        } else {
            _request(RANDOM_URL, function(err, res, body) {
                if(err || res.statusCode != 200) {
                    msg.channel.send('Not Found.');                
                } else {
                    var cardObj = JSON.parse(body);
                    msg.channel.send(mtgMessage(cardObj));
                }
            });
        }
    }
}