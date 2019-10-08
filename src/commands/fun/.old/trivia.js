'use strict';
var _request = require('request');
var commando = require("discord.js-commando");
const {RichEmbed} = require('discord.js');
const h2p = require("html2plaintext");
//var logger = require('winston');

const baseURL = 'https://opentdb.com/api.php?amount=1';

const categoryCodes = {
    general: 9,
    books: 10,
    film: 11,
    music: 12,
    musicals: 13,
    television: 14,
    videoGames: 15,
    boardGames: 16,
    science: 17,
    computers: 18,
    mathematics: 19,
    mythology: 20,
    sports: 21,
    geography: 22,
    history: 23,
    politics: 24,
    art: 25,
    celebrities: 26,
    animals: 27,
    vehicles: 28,
    comics: 29,
    gadgets: 30,
    anime: 31,
    cartoons: 32
}

module.exports = class Trivia extends commando.Command {
    constructor(client) {
        super(client, {
            name: "trivia",
            description: "trivia game",
            group: 'fun',
            memberName: "trivia",
            examples: ["!trivia (random category and difficulty)", 
                       "!trivia <category> (random difficulty)",
                       "!trivia <category> <difficulty> (replace either with random if desired)",
                       "!trivia help (For list of categories and difficulties"],
            args: [{
                key: 'category',
                prompt: 'Category for the question. Type "random" for random category',
                type: 'string',
                default: 'random'
            }, {
                key: 'difficulty',
                prompt: 'Difficulty for the question. Type "random" for random Difficulty',
                type: 'string',
                default: '0'
            }]
        });
    }
    async run(msg, args) {
        const path = this.createPath(args.category, args.difficulty);
        _request(path, function(err, res, body) {
            try {
                //logger.info(`!trivia command: ${msg.author}: ${args.category}+${args.difficulty}`);
                let data = JSON.parse(body);
                let choices = randomizeChoices(data.results[0].correct_answer, 
                    data.results[0].incorrect_answers);

                const embed = new RichEmbed()
                    .setTitle('** Trivia **')
                    .setColor(0x00FF55)
                    .addField('Category', h2p(data.results[0].category))
                    .addField('Difficulty', h2p(data.results[0].difficulty))
                    .addField('Question', h2p(data.results[0].question))
                    .addField('Choices', choices
                                .map((str, i) => `(${i+1}) ${h2p(str)}`).join("\n"));

                msg.channel.send(embed);

                let collector = msg.channel.createMessageCollector(m => {
                    if(m.author === 496343023266037761) return false;
                    if(!(m.author === msg.author)) return false;
                    let guess = parseInt(m.content);
                    if(!guess) return false;
                    else if(choices[guess - 1] === data.results[0].correct_answer) {
                        collector.stop("correct");
                        m.channel.send(`${msg.author} Correct!`);
                    } else {
                        collector.stop("wrong");
                    }
                    return false;
                }, {
                    time: 30000
                });

                collector.on('end', (c, reason) => {
                    if(reason === "time") {
                        msg.channel.send(`Ran out of time. Correct answer was: ${data.results[0].correct_answer}`);
                    }
                    if(reason === "wrong") {
                        msg.channel.send(`Wrong answer. Correct answer was: ${data.results[0].correct_answer}`);
                    }
                });
            } catch(err) {
                //logger.error(err);
            }
        });
    }

    createPath(c, d) {
        if(categoryCodes[c]) return `${baseURL}&category=${categoryCodes[c]}&difficulty=${d}`;
        return `${baseURL}&category=0&difficulty=${d}`;
    }
}

function randomizeChoices(correct, incorrect) {
    incorrect.push(correct);
    let i, j, temp;

    for(i = incorrect.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1));
        temp = incorrect[i];
        incorrect[i] = incorrect[j];
        incorrect[j] = temp;
    }
    return incorrect.map((str) => h2p(str));
}
