const axios = require('axios');
const mtgMessage = require('../../util/mtgCard');
import {Command} from '../../Command';

const FUZZY_URL = "https://api.scryfall.com/cards/named?fuzzy=";
const RANDOM_URL = "https://api.scryfall.com/cards/random";

export const MtgSearch = new Command('MTGSearch', {
    id: "mtg",
    description: "search for mtg card",
    aliases: ["mtg", "magic", 'mtgsearch', 'card'],
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
        console.log(args);
        if(args.cardName != "random") {
            let cardName = args.cardName.join("+");
            console.log(cardName);

            // logger.info(`Searching for: ${cardName}`);
            return axios(FUZZY_URL + cardName).then((res: any) => {
                return (mtgMessage(res.data));
            }).catch((err: any) => {
                console.error(err)
            });
        } else {
            return axios(RANDOM_URL).then((res: any) => {
                return (mtgMessage(res.data));
            }).catch((err: any) => {
                console.error(err)
            });
        }
    }
});