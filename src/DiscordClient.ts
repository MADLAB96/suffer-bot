var auth = require('../auth.json');
var Discord = require('discord.js');

import { DISCORD_COMMAND_LIST } from './commands/fun';
import { DISCORD_RESPONSE_LIST } from './commands/responses';
import { Client, ClientType } from './Client';
import { getResponses } from './util/queries';
import { MessageResponse } from './Command';

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
            // TODO: replace slice() with a prefix remover function
            if (msg.content.trim()[0] === '!'){
                this.handleDiscordMessage(msg, msg.content.slice(1)); 
            }
        });

        client.login(auth.token);

        this.clientObj = client;
    }

    load() {
        this.loadDefaultCommands();
        this.loadDefaultResponses();
        this.loadStoredResponses();
    }

    private async handleDiscordMessage(msg: any, content: string) {
        // already know that this is a Response, skip prefix check
        console.log('Incoming Discord message!')
        this.defaultCommands.forEach(async (command) => {
            let contentArr = content.split(" ");
            if(command.aliases.includes(contentArr[0])) {
                console.log('Command match!', command.id, contentArr);
                console.log('Command args (using defaults at this point)', command.runArgs, command.parsedArgs);
                let val: any = '';
                if(contentArr.length > 1) {
                    console.log('Using called parameters', contentArr.slice(1));
                    val = await command.run(msg, command.newCall(contentArr.slice(1)));
                    command.clean();
                } else {
                    val = await command.run(msg, command.newCall([]));
                    command.clean();
                }
                msg.channel.send(val);
            }
        });
        this.defaultResponses.forEach(async (resp) => {
            if(resp.id === content) {
                // Check for text to speech
                if(resp.tts) msg.reply(resp.res, {tts: true});
                else if(resp.res) msg.reply(resp.res);
                else if(resp.attachment) msg.channel.send(resp.attachment);
                else console.error('NO res or attachment in RESP object.');
            }
        });
        this.storedResponses.forEach(async (resp) => {
            if(resp.id === content) {
                // Check for text to speech
                if(resp.tts) msg.reply(resp.res, {tts: true});
                else if(resp.res) msg.reply(resp.res);
                else if(resp.attachment) msg.channel.send(resp.attachment);
                else console.error('NO res or attachment in RESP object.');
            }
        });
    }

    private loadDefaultResponses() {
        this.defaultResponses = DISCORD_RESPONSE_LIST;
        console.log(`loaded ${this.defaultResponses.length} default responses`);
    }

    async loadStoredResponses() {
        try {
            let storedList = await getResponses();
            let formatedList: MessageResponse[] = [];
    
            storedList.forEach((response: any) => {
                formatedList.push(new MessageResponse(response.name, {id: response.name, res: response.response, tts: response.tts}));
            });
    
            this.storedResponses = formatedList;
            console.log(`loaded ${this.storedResponses.length} stored responses`);

        } catch(error) {
            //TODO: do something with a db error XD
        }
    } 

    private loadDefaultCommands() {
        this.defaultCommands = DISCORD_COMMAND_LIST;
        console.log(`loaded ${this.defaultCommands.length} default commands`);
    }
}