'use strict';
var commando = require("discord.js-commando");
var _request = require('request');

const FUZZY_URL = "https://api.scryfall.com/cards/named?fuzzy=";
const RANDOM_URL = "https://api.scryfall.com/cards/random";

module.exports = class Mtg extends commando.Command {
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
                // console.log(body);
                if(err || res.statusCode != 200) {
                    // msg.channel.send(`${msg.author} breed: '${args.breed}' or subbreed: ${args.subBreed} not found. Sub-breed list found here:
                    //                     https://dog.ceo/api/breed/${args.breed}/list`);
                } else {
                    var JSDOG = JSON.parse(body);
                    msg.channel.send(JSDOG.image_uris.normal);
                }
            });
        } else {
            _request(RANDOM_URL, function(err, res, body) {
                if(err || res.statusCode != 200) {
                    msg.channel.send(`dog API === borked`);
                } else {
                    var JSDOG = JSON.parse(body);
                    msg.channel.send(JSDOG.image_uris.normal);
                }
            });
        }
    }
}