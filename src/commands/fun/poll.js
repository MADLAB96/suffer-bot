'use strict';
var commando = require("discord.js-commando");
var Poll = require('../../classes/poll');
var PollOption = require('../../classes/pollOption');
var pollStorage = "./data/pollData.json";
var fs = require('fs');

function store(msg, poll) {
    //called to store poll.
    //if we get a poll of same channel, delete and re-add
    let data = fs.readFileSync(pollStorage);
    var obj = JSON.parse(data);
    for(let i = 0; i < obj.polls.length; i++) {
        if(obj.polls[i].channel === msg.channel.id) {
            //remove from array
            obj.polls.splice(i, 1);
            i = obj.polls.length;
        }
    }
    if(poll !== undefined) {
        obj.polls.push(poll);
    } else {
        console.log('null poll add attempt')
    }
    var str = JSON.stringify(obj);
    fs.writeFile(pollStorage, str, 'utf8', (err) => {
        if(err) console.log(err);
    });
}

function deletePoll(msg, poll) {
    let data = fs.readFileSync(pollStorage);
    var obj = JSON.parse(data);
    for(let i = 0; i < obj.polls.length; i++) {
        if(obj.polls[i].channel === msg.channel.id) {
            //remove from array
            obj.polls.splice(i, 1);
            i = obj.polls.length;
        }
    }
    var str = JSON.stringify(obj);
    fs.writeFile(pollStorage, str, 'utf8', (err) => {
        if(err) console.log(err);
    });
}


function read() {
    let data = fs.readFileSync(pollStorage);
    var obj = JSON.parse(data);
    return obj;
}

module.exports = class PollCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "poll",
            description: "simple polling",
            group: 'fun',
            aliases: ["lunch"],
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
                    default: "",
                    require: false,
                    // infinite: true, 
                }
            ]
        });
    }
    async run(msg, args) {
        // let argsArgs = makeString(args.args); 
        let argsArgs = args.args;

        if(args.command === 'show') {
            let poll = getPoll(msg, argsArgs);
            poll.displayInfo(msg);
        } else if(args.command === 'winner') {
            let poll = getPoll(msg, argsArgs);
            poll.calculateWinner(msg);
        } else if(args.command === 'add') {
            console.log('add poll')
            let poll = getPoll(msg, argsArgs);
            let pollOption = new PollOption(argsArgs, msg.author.id);
            poll.addOption(pollOption, msg.author.id);
            store(msg, poll);
            poll.displayInfo(msg);
        } else if(args.command === 'vote') {
            console.log('vote poll')
            let poll = getPoll(msg, argsArgs);
            let pollOption = new PollOption(argsArgs, msg.author.id);
            poll.vote(msg, pollOption, msg.author.id);
            store(msg, poll);
            poll.displayInfo(msg);
        } else if(args.command === 'create') {
            console.log('create poll')
            let poll = new Poll(msg.author.id, msg.channel.id, argsArgs, []);
            store(msg, poll);
            msg.channel.send(`Start voting on: ${argsArgs}`);
        } else if(args.command === 'delete') {
            console.log('delete poll')
            let poll = getPoll(msg, argsArgs);

            // should only be deletable by the poll's author
            if(poll.author === msg.author.id) {
                //delete it
                deletePoll(msg, poll);
            } else {
                msg.channel.send('Only the author can delete the poll.');
            }
        } else {
            msg.channel.send('Unknown argument.')
        }
    }
}

function makeString(arr) { 
    let str = "";
    arr.forEach(i => { str += (i + ' '); });
    return str.slice(0, str.length - 1);
}

function getPoll(msg, title) {
    let data = read();
    //check if a poll already exists in this channel
    let poll;

    data.polls.forEach(p => {
        if((p.channel === msg.channel.id) && ((Date.now() - p.startTime) < 900000)) { //15 minutes
            poll = new Poll(p.author, p.channel, p.title, p.options);
        }
    });
    return poll;
}