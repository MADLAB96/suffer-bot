'use strict';
var commando = require("discord.js-commando");
var Outlaw = require('../../classes/outlaw');
var outlawStorage = "./data/outlawData.json";
var fs = require('fs');

class Duel {
    constructor(author, target){
        this.author = author;
        this.target = target;
        this.status = 'STARTED'
    }

    calcWinner(msg) {
        var authorRoll = Math.floor(Math.random() * (this.author.kills + 100));
        var targetRoll = Math.floor(Math.random() * (this.target.kills + 100));
        if (authorRoll > targetRoll) {
            this.storeWinner(this.author);
            msg.channel.send(`:gun: ${this.target.nickname} perished at the hands of ${this.author.nickname} :gun:`);
        } else if(authorRoll < targetRoll) {
            console.log(this.target)
            this.storeWinner(this.target);        
            msg.channel.send(`:gun: ${this.author.nickname} perished at the hands of ${this.target.nickname} :gun:`);
        } else {
            this.storeWinner(this.target);       
            this.storeWinner(this.author);
            msg.channel.send(`:gun: Both ${this.author.nickname} and ${this.target.nickname} perished :gun:`);
        }
    }

    storeWinner(winner) {
        var tempObj;
        var data = fs.readFileSync(outlawStorage, 'utf8');
        var obj = JSON.parse(data);
        obj.outlaws.forEach(outlaw => {
            if(outlaw.author == winner.author) {
                tempObj = outlaw;
                // obj.outlaws[outlaw].kills += 1;
                return;
            }
        });
        console.log(tempObj)
        tempObj.kills += 1;
        obj.outlaws[tempObj] = tempObj;
        var json = JSON.stringify(obj);

        fs.writeFile(outlawStorage, json, 'utf8');
    }
}

function toggleWrapper(str) {
    if(str[0] === "<") {
        str = str.slice(2)
        str = str.slice(0, -1)
        return str;
    } else {
        return ("<@" + str + ">");
    }
}

function getOutlaw(msg, ownerId) {
    var newOutlaw;
    var data = fs.readFileSync(outlawStorage, 'utf8');
    var obj = JSON.parse(data);
    obj.outlaws.forEach(outlaw => {
        console.log("F:  " + toggleWrapper(outlaw.author) + " " + ownerId);
        if(toggleWrapper(outlaw.author) == (ownerId)) newOutlaw = outlaw; 
    });
    console.log("F2:  " + newOutlaw + " " + ownerId);
    if(newOutlaw == undefined) {
        console.log("F3:  " + newOutlaw + " " + ownerId);
        msg.channel.send(`${ownerId} does not have an outlaw. Create one with "~outlaw <name> <description>".`);
        return false;
    } else {
        return newOutlaw;
    }
}

function validateOutlaws(msg, authorId, target) {
    var ifAuthor = false;
    var ifTarget = false;
    var data = fs.readFileSync(outlawStorage, 'utf8');
    var obj = JSON.parse(data);
    obj.outlaws.forEach(outlaw => {
        if(outlaw.author === (authorId.id)) ifAuthor = true; 
        else if((outlaw.author) === toggleWrapper(target)) ifTarget = true; 
    }); 
    console.log("F4: " + ifAuthor + " " + ifTarget);
    console.log("F5: " + authorId + " " + target);

    if(ifAuthor && ifTarget) return true;
    else if(!ifAuthor) {
        msg.channel.send(`${msg.author} does not have an outlaw. Create one with "~outlaw <name> <description>".`);
    } else if(!ifTarget) {
        msg.channel.send(`${target} does not have an outlaw. Create one with "~outlaw <name> <description>".`);
    }
    return false;
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
        } else if(validateOutlaws(msg, msg.author, args.target)){
            var authorOL = getOutlaw(msg, msg.author);
            var targetOL = getOutlaw(msg, args.target);
            var newDuel = new Duel(authorOL, targetOL);
            newDuel.calcWinner(msg);
        }
    }
}