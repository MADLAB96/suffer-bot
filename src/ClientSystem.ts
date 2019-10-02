var commando = require('discord.js-commando');
var path = require('path');
var tmi  = require('tmi.js');

export default class ClientSystem {
    public discordClient: any;
    public twitchClient: any;
    public commands: any;
    public defaultResponses: any;
    public storedRessponses: any;
    public auth: any;

    constructor(auth: any) {
        this.discordClient = null;
        this.twitchClient = null;   
        this.commands = [];         
        this.defaultResponses = []; // Default responses
        this.storedRessponses = []; // responses stored in database
        
        if(auth) this.auth = auth;
        else this.auth = {};
    }

    initDiscord(): ClientSystem {
        const client = new commando.Client({
            owner: '209463572395196417',
            commandPrefix: '!'
        });
        
        client.on('ready', function (evt: any) {
            var list: any[] = [];
            //TODO: Log the Guild name instead (or in addition)
            client.channels.forEach((channel: any) => {
                list.push(channel.name)
            });
            console.log('connected to:', list);
            console.log('Started');
        });
        
        client.registry
                .registerGroup('fun', 'Fun')
                .registerGroup('response', 'Response')
                .registerDefaults()
                .registerCommandsIn(path.join(__dirname, './commands'));
        
        // authentication
        client.login(this.auth.token);

        return this;
    }

    initTwitch(): ClientSystem {
        // TODO: Import this from config file.
        const twitchOpts = {
            identity: {
                username: 'suffer-bot',
                password: this.auth.twitch
            },
        
            channels: [
                'Madlab96'
            ]
        }
        
        const twitchClient = new tmi.client(twitchOpts);
        
        twitchClient.connect();
        
        twitchClient.on('message', (target: any, context: any, msg: any, self: any) => {
            console.log('new msg:', msg);
            if(msg.trim().slice(0, 1) === '!') {
                console.log('prefix !::');
            }
            if(msg.includes('society') || msg.includes('joker') || msg.includes('we')) {
                twitchClient.say(target, 'gamer word');
            }
            if(msg.includes('nagger')) {
                twitchClient.say(target, 'ayy');
            }
        });
        
        
        twitchClient.on('connected', (addr: any, port: any) => {
            console.log(`* Connected to ${addr}:${port}`);
        });        

        return this;
    }
}