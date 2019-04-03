'use strict';
var commando = require("discord.js-commando");
var Poll = require('../../classes/poll');
var PollOption = require('../../classes/pollOption');
var pollStorage = "./data/pollData.json";
var fs = require('fs');

function store(msg, poll) {
    fs.readFile(pollStorage, 'utf8', (err, data) => {
        if(err) {
            console.log(err);
        } else {
            var obj = JSON.parse(data);
            obj.polls.push(poll);
            var json = JSON.stringify(obj);
            fs.writeFile(pollStorage, json, 'utf8', (err) => {
                if(err) console.log(err);
            });
        }
    });
}

function read(msg) {
    fs.readFile(pollStorage, 'utf8', (err, data) => {
        if(err) {
            console.log(err);
        } else {
            var obj = JSON.parse(data);
            obj.polls.push(poll);
            var json = JSON.stringify(obj);
        }
    });
}

module.exports = class PollCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "poll",
            description: "simple polling",
            group: 'fun',
            memberName: "poll",
            examples: ["!poll <command create|pick|vote|print> <text>",
                       "!poll create Lunch Poll",
                       "!poll vote Qdoba"],
            args: [{
                    key: 'command',
                    prompt: 'poll command (add, vote, create, pick)',
                    type: 'string',
                    default: "create"
                },
                {
                    key: 'args',
                    prompt: 'text for poll choice',
                    type: 'string',
                    // default: "",
                    infinite: true, 
                }
            ]
        });
    }
    async run(msg, args) {
        console.log('asdf')
        let pollOpt = new PollOption("xD", msg.author.id);
        let poll = new Poll(msg.author.id, msg.channel.id, makeString(args.args), pollOpt);
        store(msg, poll);
        //check if a poll already exists in this channelç
        //if not create one (add command)
        //vote
        //pick option
    }
}

function makeString(arr) { 
    let str = "";
    arr.forEach(i => { str += (i + ' '); });
    return str;
}