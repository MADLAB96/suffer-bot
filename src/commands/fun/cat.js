'use strict';
var _request = require('request');
var commando = require("discord.js-commando");
var logger = require('winston');
var auth = require('../../../auth.json');

const MAX_PAGE_NUM = 2806;
const BREED_URL_BASE = "https://api.thecatapi.com/v1/images/search?breed_ids=";

module.exports = class Cat extends commando.Command {
    constructor(client) {
        super(client, {
            name: "cat",
            description: "random cat",
            aliases: ["kitty", "meow"],
            group: 'fun',
            memberName: "cat",
            examples: ["!cat"],
            args: [{
                key: 'breed',
                prompt: 'usage: !cat <{breed}/gif/help>',
                type: 'string',
                default: 'random'
            }],
        });
    }

    async run(msg, args) {
        var help = false;

        var options = {
            url: 'https://api.thecatapi.com/v1/breeds',
            headers: {
                "x-api-key": auth.catToken
            }
        };

        _request(options, function(err, res, body) {
            if(err) {
                msg.channel.send('mewed :3');
            } else {
                var breeds = JSON.parse(body);

                if(args.breed === 'random') {
                    options.url = `${BREED_URL_BASE}${getBreedId(breeds, args.breed)}`;
                } else if(args.breed.toLowerCase() === 'gif') {
                    options.url = `https://api.thecatapi.com/v1/images/search?mime_types=gif`;
                } else if(args.breed.toLowerCase() === 'list' || args.breed.toLowerCase() === 'help') {
                    help = true;
                } else { 
                    options.url = `${BREED_URL_BASE}${getBreedId(breeds, args.breed)}`;
                }
    
                _request(options, function(err, res, body) {
                    logger.info(`!cat command: ${msg.author} ${args.breed}`);
                    if(err) {
                        msg.channel.send('mewed :3');
                    } else {
                        var json = JSON.parse(body);
        
                        if(help) {
                            var str = '';
                            json.forEach((catBreed) => {
                                str += `${catBreed.name} (${catBreed.id})\n`;
                            });
                            msg.author.send(str);
                            msg.channel.send('List sent to your PM.');
                        } else {
                            msg.channel.send(json[0].url);
                        }
                    }
                });
            }
        });
    }
}

function getBreedId(list, search) {
    var id = '';
    list.forEach((breed) => {
        if(breed.name == search || breed.id == search) {
            id = breed.id;
        }
    });
    return id;
}
