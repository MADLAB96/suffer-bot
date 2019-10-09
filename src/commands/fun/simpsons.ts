import {Command} from '../../Command';
const _request = require('request');
const auth = require('../../../auth.json')
const tenorUrl = 'https://api.tenor.com/v1/random?key=' + auth.tenorToken;
const axios = require('axios');

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
        // console.log(genUrl(args.extraSearch)); // TODO: logger here 
        return axios.get(genUrl(args.extraSearch)).then((res: any) => {
            let jsonBody = res.data;
            if(jsonBody.results && jsonBody.results.length !== 0) {
                let randId = Math.floor(Math.random() * jsonBody.results.length);
                return (jsonBody.results[randId].url);
            } else {
                return ('IDK Your search sucks, try again');
            }
        }).catch((err: any) => {
            console.error(err)
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