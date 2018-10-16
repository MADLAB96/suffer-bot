'use strict';
var commando = require("discord.js-commando");
var Outlaw = require('../../classes/outlaw');
var outlawStorage = "./../../../data/outlaw";
var fs = require('fs');

class Duel {
    constructor(msg, author, target){
        this.msg = msg;
        this.author = author;
        this.target = target;
        this.status = 'STARTED'
    }

    calcWinner(msg) {
        var randRoll1 = Math.floor(Math.random() * (this.author.kills + 100));
        var randRoll2 = Math.floor(Math.random() * (this.target.kills + 100));
        if (randRoll1 > randRoll2) {
            this.author.kills += 1;
            msg.channel.send(`:gun: ${msg.author} perished at the hands of ${args.target} :gun:`);
        } else if(randRoll1 < randRoll2) {
            this.target.kills += 1;            
            msg.channel.send(`:gun: ${args.target} perished at the hands of ${msg.author} :gun:`);
        } else {
            msg.channel.send(`:gun: Both ${msg.author} and ${args.target} perished :gun:`);
        }
    }

    storeResults() {
        fs.readFile(outlawStorage, 'utf8', function readFileCallback(err, data) {
            if(err) this.msg.channel.send('error retreving data, try again later Noo:b:');
            else {
                var obj = JSON.parse(data);
                obj.outlaws.forEach(outlaw => {
                    if(outlaw.author === this.author.author) {
                        obj.outlaws[outlaw].kill = this.author.kills;
                    } else if (outlaw.author === this.target.author) {
                        obj.outlaws[outlaw].kill = this.target.kills;
                    }
                }); 
                json = JSON.stringify(obj);
                fs.writeFile(outlawStorage, json, 'utf8', callback)
            }
        })
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
            var newDuel = new Duel(msg, authorOL, targetOL);
            newDuel.calcWinner(msg);
            newDuel.storeResults();
        }
    }
}