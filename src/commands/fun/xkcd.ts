'use strict';
var _request = require('request');
import {Command} from '../../Command';

export const Xkcd = new Command('XKCD', {
    id: "comic",
    description: "random xkcd comic",
    examples: ["!comic", "!comic <num>"],
    args: [{
        key: 'number',
        type: 'integer|string',
        default: 'random'
    }],
    run: async (msg: any, args: any) => {
        if(args.number > 0) {
            specificComic(msg, args);
        } else if(args.number === 'random') {
            randomComic(msg);
        }
    }
});

function specificComic(msg: any, comicNum: any) {
    var baseURL = "http://xkcd.com/";
    var jsonURL = "info.0.json";
    _request(`${baseURL}${comicNum.number}/${jsonURL}`, function(err: any, res: any, body: any) {
        var comic = JSON.parse(body); 
        var infoMsg = `${comic}: ${comic.title}\n${comic.img}`;  
        console.log(infoMsg);     
        msg.channel.send(infoMsg, () => {
            msg.channel.send(comic.alt);
        });
    });
}

function randomComic(msg: any) {
    var baseURL = "http://xkcd.com/";
    var jsonURL = "info.0.json";
    _request((baseURL+jsonURL), function(err: any, res: any, body: any) {        
        var comic = JSON.parse(body);
        var randComic = 1 + Math.floor(Math.random() * Math.floor(comic.num));
        _request(`${baseURL}${randComic}/${jsonURL}`, function(err: any, res: any, body: any) {
            var comic = JSON.parse(body); 
            var infoMsg = `${randComic}: ${comic.title}\n${comic.img}`;       
            msg.channel.send(infoMsg, () => {
                msg.channel.send(comic.alt);
            });
        });
    });
}
