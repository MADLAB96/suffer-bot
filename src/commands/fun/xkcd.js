'use strict';
var _request = require('request');
var commando = require("discord.js-commando");

module.exports = class Xkcd extends commando.Command {
    constructor(client) {
        super(client, {
            name: "comic",
            description: "random xkcd comic",
            group: 'fun',
            memberName: "comic",
            examples: ["!comic", "!comic <num>"],
            args: [{
                key: 'number',
                prompt: 'Which comic would you like? Leave blank for random.',
                type: 'integer|string',
                default: 'random'
            }]
        });
    }
    async run(msg, args) {
        if(args.number > 0) {
            this.specificComic(msg, args);
        } else if(args.number === 'random') {
            this.randomComic(msg);
        }
    }

    specificComic(msg, comicNum) {
        var baseURL = "http://xkcd.com/";
        var jsonURL = "info.0.json";
        _request(`${baseURL}${comicNum.number}/${jsonURL}`, function(err, res, body) {
            var comic = JSON.parse(body); 
            var infoMsg = `${comic}: ${comic.title}\n${comic.img}`;  
            console.log(infoMsg);     
            msg.channel.send(infoMsg, () => {
                msg.channel.send(comic.alt);
            });
        });
    }

    randomComic(msg) {
        var baseURL = "http://xkcd.com/";
        var jsonURL = "info.0.json";
        _request((baseURL+jsonURL), function(err, res, body) {        
            var comic = JSON.parse(body);
            var randComic = 1 + Math.floor(Math.random() * Math.floor(comic.num));
            _request(`${baseURL}${randComic}/${jsonURL}`, function(err, res, body) {
                var comic = JSON.parse(body); 
                var infoMsg = `${randComic}: ${comic.title}\n${comic.img}`;       
                msg.channel.send(infoMsg, () => {
                    msg.channel.send(comic.alt);
                });
            });
        });
    }
}