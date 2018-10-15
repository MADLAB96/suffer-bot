'use strict';
var _request = require('request');
var commando = require("discord.js-commando");

module.exports = class Cat extends commando.Command {
    constructor(client) {
        super(client, {
            name: "cat",
            description: "random cat",
            group: 'fun',
            memberName: "cat",
            examples: ["!cat"],
        });
    }
    async run(msg) {
        _request('http://aws.random.cat/meow', function(err, res, body) {
            if(err) {
                msg.channel.send('mewed :3');
            } else {
                var cat = JSON.parse(body); 
                msg.channel.send(cat.file);
            }
        })
    }
}