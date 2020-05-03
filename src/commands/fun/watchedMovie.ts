const axios = require('axios');
const mtgMessage = require('../../util/mtgCard');
import {Command} from '../../Command';
import {watchedMovie} from '../../util/queries';

export const WatchedMovie = new Command('WatchedMovie', {
    id: "watched",
    description: "updated movie to not be in watchlist",
    aliases: ["watched"],
    examples: ["!watched"],
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
            console.log('queried movieName', movieName);
            try {
                let res = await watchedMovie(movieName);
                console.log(res);
                return `Updated ${movieName}`;
            } catch(error) {
                console.log(error);
                return error;
            }
        }
    }
});