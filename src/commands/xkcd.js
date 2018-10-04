'use strict';

var _request = require('request');

module.exports = {
    meta: {
        help: "random xkcd comic",
        usage: "!comic"
    },
    fn: function(msg) {    
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