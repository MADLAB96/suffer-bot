'use strict';
var commando = require("discord.js-commando");
var _request = require('request');
//var logger = require('winston');

var randomURL = 'https://dog.ceo/api/breeds/image/random';
var subURL = 'https://dog.ceo/api/breed/';

module.exports = class Dog extends commando.Command {
    constructor(client) {
        super(client, {
            name: "dog",
            description: "rnadom pup",
            group: 'fun',
            aliases: ["dog", "doge", "pup"],
            memberName: "dog",
            examples: ["!dog"],
            args: [
                {
                    key: 'breed',
                    prompt: 'usage: !dog <bread>',
                    type: 'string',
                    default: 'random'
                },
                {
                    key: 'subBreed',
                    prompt: 'usage: !dog <bread> <sub-breed>',
                    type: 'string',
                    default: 'random'
                }],
        });
    }
    async run(msg, args) {
        //logger.info(`!dog command: ${msg.author}: ${args.subBreed}+${args.breed}`);
        if(args.subBreed != "random") {
            var subBreedURL = subURL + args.breed + '/' + args.subBreed + '/images/random';
            _request(subBreedURL.toLowerCase(), function(err, res, body) {
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
            _request(breedURL.toLowerCase(), function(err, res, body) {
                if(err || res.statusCode != 200) {
                    msg.channel.send(`${msg.author} breed: '${args.breed}' not found. List found here:
                                        https://dog.ceo/api/breeds/list/all`);
                } else {
                    var JSDOG = JSON.parse(body);
                    msg.channel.send(JSDOG.message);
                }
            });    
        } else {
            _request(randomURL.toLowerCase(), function(err, res, body) {
                if(err || res.statusCode != 200) {
                    msg.channel.send(`dog API === borked`);
                } else {
                    var JSDOG = JSON.parse(body);
                    msg.channel.send(JSDOG.message);
                }
            });
        }
    }
}
