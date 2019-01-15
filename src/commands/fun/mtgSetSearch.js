'use strict';
var commando = require("discord.js-commando");
var _request = require('request');
var mtgMessage = require('../../util/mtgCard');

const SEARCH_URL = "https://api.scryfall.com/cards/collection";

module.exports = class MtgSearch extends commando.Command {
    constructor(client) {
        super(client, {
            name: "mtgset",
            description: "search for mtg set (3 letter ID)",
            group: 'fun',
            aliases: ["mtgset", "magicset"],
            memberName: "mtgset",
            examples: ["!mtgset mrd"],
            args: [
                {
                    key: 'setId',
                    prompt: 'Enter the 3 letter identifier for the set.',
                    type: 'string',
                    required: true
                },
                {
                    key: 'cardName',
                    prompt: 'Type card name.',
                    type: 'string',
                    wait: 20,
                }
            ]
        });
    }
    async run(msg, args) {        
        var postData = { identifiers: [{ name: args.cardName, set: args.setId }] };
          
        var options = {
            method: 'post',
            body: postData,
            json: true,
            url: SEARCH_URL
        }

        _request(options, (err, res, body) => {
            if(err || res.statusCode != 200) {
                msg.channel.send('Useful Error message');                
            } else {
                msg.channel.send(mtgMessage(body.data[0]));
            }
        });
    }
}