const axios = require('axios');
const mtgMessage = require('../../util/mtgCard');
import {Command} from '../../Command';
import {getWatchlist} from '../../util/queries';
import discordClient from '../../bot';

export const Watchlist = new Command('Watchlist', {
    id: "watchlist",
    description: "add response to database",
    aliases: ["watchlist"],
    examples: ["!watchlist"],
    run: async (msg: any, args: any) => {
        try {
            let res = await getWatchlist();
            let movieList = '';
            res.forEach((movie: any) => {
                movieList += movie.name + ', ';
            });
            return 'Watchlist: ' + movieList;
        } catch(error) {
            console.log(error);
            return error;
        }
    }
});