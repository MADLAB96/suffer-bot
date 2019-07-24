'use strict';
const commando = require("discord.js-commando");
const _request = require('request');
const auth = require('../../../auth.json')
const tenorUrl = 'https://api.tenor.com/v1/random?key=' + auth.tenorToken;

module.exports = class SimpsonsGifs extends commando.Command {
    constructor(client) {
        super(client, {
            name: "simpsons",
            description: "random simpsons gif",
            group: 'fun',
            aliases: ["simpsons"],
            memberName: "simpsons",
            examples: ["!simpsons"],
            args: [
                {
                    key: 'extraSearch',
                    prompt: 'usage: !simpsons <searchTerm>',
                    type: 'string',
                    default: '',
                }
            ]});
    }
    async run(msg, args) {
        console.log(genUrl(args.extraSearch));
        
        _request(genUrl(args.extraSearch), function(err, res, body) {
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
}

function genUrl(searchTerms) {
    if(searchTerms === '') {
        return `https://api.tenor.com/v1/random?q=simpsons&key=${auth.tenorToken}`
    } else {
        let replace = searchTerms.split(' ').join('+');
        return `https://api.tenor.com/v1/random?q=simpsons+${replace}&key=${auth.tenorToken}`
    }
}