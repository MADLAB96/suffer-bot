const axios = require('axios');
const mtgMessage = require('../../util/mtgCard');
import {Command} from '../../Command';
import {addMovie} from '../../util/queries';
import discordClient from '../../bot';

export const AddMovie = new Command('AddMovie', {
    id: "addMovie",
    description: "add response to database",
    aliases: ["addMovie", "watch", "toWatch"],
    examples: ["!addMovie"],
    args: [
        {
            key: 'movieName',
            type: 'string',
            infinite: true,
            default: 'random123',
        },
    ],
    run: async (msg: any, args: any) => {
        console.log(args);
        if(args.movieName != "random123") {
            let movieName = args.movieName.join(" ");
            console.log('new resText', movieName);

            try {
                let res = await addMovie(args.movieName);
                console.log(res);
                discordClient.loadStoredResponses();
                return `Added ${args.movieName} to the watch list.`;
            } catch(error) {
                console.log(error);
                return error;
            }
        }
    }
});