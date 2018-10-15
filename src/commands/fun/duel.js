'use strict';
var commando = require("discord.js-commando");

class Outlaw {
    constructor(author) {
        this.author = author;
        this.kills = 0;
        this.desc = "";
        this.rapSheet = [];
        this.bounty = 0;
    }
    displayInfo(msg) {
        //send message of their outlaw info 
    }
}

class Duel {
    constructor(msg, author, target){
        this.msg = msg;
        this.author = author;
        this.target = target;
        this.status = 'STARTED'
    }

    calcWinner() {

    }
}

module.exports = class DuelCMD extends commando.Command {
    constructor(client) {
        super(client, {
            name: "duel",
            description: ":gun:",
            group: 'fun',
            memberName: "duel",
            examples: ["!duel @someone"],
            args: [{
                key: 'target',
                prompt: 'who would you like to duel? ~duel @someone',
                type: 'string',
            }]
        });
    }
    async run(msg, args){
        //create duel
        //wait for responces from author/target
        //close duel
        //perhaps store results for stats

        if(msg.author === args.target) {
            msg.channel.send(`Silly ${msg.author} you can't duel yourself.`)
        } else {
            var randRoll1 = Math.floor(Math.random() * 100);
            var randRoll2 = Math.floor(Math.random() * 100);
            if (randRoll1 > randRoll2) {
                msg.channel.send(`:gun: ${msg.author} perished at the hands of ${args.target} :gun:`);
            } else if(randRoll1 < randRoll2) {
                msg.channel.send(`:gun: ${args.target} perished at the hands of ${msg.author} :gun:`);
            } else {
                msg.channel.send(`:gun: Both ${msg.author} and ${args.target} perished :gun:`);
            }
        }
    }

    startDuel(msg, author, target) {

    }
}