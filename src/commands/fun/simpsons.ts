'use strict';

import {Command} from '../../Command';
const _request = require('request');
const auth = require('../../../auth.json')
const tenorUrl = 'https://api.tenor.com/v1/random?key=' + auth.tenorToken;

export const SimpsonsGifs = new Command('SimpsonsGIF', {
    id: "simpsons",
    description: "random simpsons gif",
    aliases: ["simpsons"],
    examples: ["!simpsons"],
    args: [
        {
            key: 'extraSearch',
            type: 'string',
            default: '',
        }
    ],
    run: async (msg: any, args: any) => {
        console.log(genUrl(args.extraSearch));
        
        _request(genUrl(args.extraSearch), function(err: any, res: any, body: any) {
            if(err) console.log(err);
            else {
                let jsonBody = JSON.parse(body);
                if(jsonBody.results && jsonBody.results.length !== 0) {
                    let randId = Math.floor(Math.random() * jsonBody.results.length);
                    msg.channel.send(jsonBody.results[randId].url);
                } else {
                    msg.channel.send('IDK Your search sucks, try again');
                }
            }
        });

    }
}) 

function genUrl(searchTerms: any) {
    if(searchTerms === '') {
        return `https://api.tenor.com/v1/random?q=simpsons&key=${auth.tenorToken}`
    } else {
        let replace = searchTerms.split(' ').join('+');
        return `https://api.tenor.com/v1/random?q=simpsons+${replace}&key=${auth.tenorToken}`
    }
}