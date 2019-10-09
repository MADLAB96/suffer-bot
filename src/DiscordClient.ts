var auth = require('../auth.json');
var Discord = require('discord.js');

import DefaultCommands from './commands/fun';
import { Client, ClientType } from './Client';
import { MessageResponseList } from './commands/responses';

export default class DiscordClient extends Client {
    constructor() {
        super(ClientType.Discord);

        this.init();
        this.load();
    }

    init() {
        console.log('Building Discord Client:');
        const client = new Discord.Client();

        client.on('ready', () => {
            console.log(`DISCORD::Logged in as ${client.user.tag}!`);
        });

        client.on('message', (msg: any) => {
            if (msg.content.trim()[0] === '!'){
                this.handleDiscordMessage(msg, msg.content.slice(1)); // TODO: replace slice() with a prefix remover function
            }
        });

        client.login(auth.token);

        this.clientObj = client;
    }

    load() {
        this.loadDefaultCommands();
        this.loadDefaultResponses();
    }

    private async handleDiscordMessage(msg: any, content: string) {
        // already know that this is a Response, skip prefix check
        console.log('Incoming Discord message!')
        this.defaultResponses.forEach(async (resp) => {
            if(resp.id === content) {
                msg.reply(resp.res);
            }
        });
        this.defaultCommands.forEach(async (command) => {
            let contentArr = content.split(" ");
            if(command.id === contentArr[0]) {
                console.log('Command match!', command.id, contentArr);
                console.log('Command args (using defaults at this point)', command.runArgs, command.parsedArgs);
                let val: any; // TODO: this should have a default value
                if(contentArr.length > 1) {
                    console.log('Using called parameters', contentArr.slice(1));
                    val = await command.run(msg, command.newCall(contentArr.slice(1)));
                } else {
                    val = await command.run(msg, command.newCall([]));
                }
                msg.channel.send(val);
            }
        });
    }

    private loadDefaultResponses() {
        this.defaultResponses = MessageResponseList;
        console.log(`loaded ${this.defaultResponses.length} default responses`);
    }

    private loadDefaultCommands() {
        this.defaultCommands = DefaultCommands;
        console.log(`loaded ${this.defaultCommands.length} default commands`);
    }
}