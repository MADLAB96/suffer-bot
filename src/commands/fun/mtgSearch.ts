'use strict';
var _request = require('request');
var mtgMessage = require('../../util/mtgCard');
import {Command} from '../../Command';

const FUZZY_URL = "https://api.scryfall.com/cards/named?fuzzy=";
const RANDOM_URL = "https://api.scryfall.com/cards/random";

export const MtgSearch = new Command('MTGSearch', {
    id: "mtg",
    description: "search for mtg card",
    aliases: ["mtg", "magic", 'mtgsearch'],
    examples: ["!mtg"],
    args: [
        {
            key: 'cardName',
            type: 'string',
            default: 'random',
            infinite: true
        },
    ],
    run: async (msg: any, args: any) => {
        if(args.cardName != "random") {
            let cardName = args.cardName.join("+");
            // logger.info(`Searching for: ${cardName}`);
            _request((FUZZY_URL + cardName), function(err: any, res: any, body: any) {
                // console.log(body);
                if(err || res.statusCode != 200) {
                    msg.channel.send('Not Found.');                
                    // logger.error(`Did not find card: ${args.cardName}`);     
                } else {
                    var cardObj = JSON.parse(body);
                    msg.channel.send(mtgMessage(cardObj));
                }
            });
        } else {
            _request(RANDOM_URL, function(err: any, res: any, body: any) {
                if(err || res.statusCode != 200) {
                    msg.channel.send('Error searching for randod card');                
                    // logger.error('Error searching for randod card');     
                } else {
                    var cardObj = JSON.parse(body);
                    msg.channel.send(mtgMessage(cardObj));
                }
            });
        }
    }
});