var _request = require('request');
//var logger = require('winston');
import {Command} from '../../Command';

var randomURL = 'https://dog.ceo/api/breeds/image/random';
var subURL = 'https://dog.ceo/api/breed/';

export const Dog = new Command('Dog', {
    id: "dog",
    description: "rnadom pup",
    aliases: ["dog", "doge", "pup"],
    args: [
        {
            key: 'breed',
            type: 'string',
            default: 'random'
        },
        {
            key: 'subBreed',
            type: 'string',
            default: 'random'
        }],
    run: async (msg: any, args: any) => {
        //logger.info(`!dog command: ${msg.author}: ${args.subBreed}+${args.breed}`);
        if(args.subBreed != "random") {
            var subBreedURL = subURL + args.breed + '/' + args.subBreed + '/images/random';
            _request(subBreedURL.toLowerCase(), function(err: any, res: any, body: any) {
                if(err || res.statusCode != 200) {
                    msg.channel.send(`${msg.author} breed: '${args.breed}' or subbreed: ${args.subBreed} not found. Sub-breed list found here:
                                        https://dog.ceo/api/breed/${args.breed}/list`);
                } else {
                    var JSDOG = JSON.parse(body);
                    msg.channel.send(JSDOG.message);
                }
            });
        } else if(args.breed != "random") {
            var breedURL = subURL + args.breed + '/images/random';
            _request(breedURL.toLowerCase(), function(err: any, res: any, body: any) {
                if(err || res.statusCode != 200) {
                    msg.channel.send(`${msg.author} breed: '${args.breed}' not found. List found here:
                                        https://dog.ceo/api/breeds/list/all`);
                } else {
                    var JSDOG = JSON.parse(body);
                    msg.channel.send(JSDOG.message);
                }
            });    
        } else {
            _request(randomURL.toLowerCase(), function(err: any, res: any, body: any) {
                if(err || res.statusCode != 200) {
                    msg.channel.send(`dog API === borked`);
                } else {
                    var JSDOG = JSON.parse(body);
                    msg.channel.send(JSDOG.message);
                }
            });
        }
    }
});