const axios = require('axios');
const mtgMessage = require('../../util/mtgCard');
import {Command} from '../../Command';
import {addResponse} from '../../util/queries';
import discordClient from '../../bot';

export const AddResponse = new Command('AddResponse', {
    id: "add",
    description: "add response to database",
    aliases: ["add"],
    examples: ["!add"],
    args: [
        {
            key: 'resName',
            type: 'string',
            default: 'random123',
        },
        {
            key: 'resText',
            type: 'string',
            infinite: true,
            default: 'random123',
        },
    ],
    run: async (msg: any, args: any) => {
        console.log(args);
        if(args.resText != "random123") {
            let resText = args.resText.join(" ");
            console.log('new resText', resText);

            try {
                let res = await addResponse(args.resName, args.resText);
                console.log(res);
                discordClient.loadStoredResponses();
                return 'reee';
            } catch(error) {
                console.log(error);
                return error;
            }
        }
    }
});