var commando = require('discord.js-commando');
var path = require('path');
var tmi = require('tmi.js');
var Discord = require('discord.js');

export default class ClientSystem {
    public discordClient: any;
    public commandoClient: any;
    public twitchClient: any;
    public commands: any;
    public defaultResponses: any;
    public storedResponses: any;
    public auth: any;

    constructor(auth: any) {
        this.discordClient = null;
        this.twitchClient = null;
        this.commands = [];
        this.defaultResponses = []; // Default responses
        this.storedResponses = []; // responses stored in database

        if (auth) this.auth = auth;
        else this.auth = {};

        // Load commands and responses?

    }

    // TODO: remove this as it becomes obsolete
    initCommando(): ClientSystem {
        const client = new commando.Client({
            // TODO: Add this to auth (pretty sure its public but should anyways)
            // TODO: Add this to auth documentation (what is owner?)
            owner: '209463572395196417',
            commandPrefix: '!'
        });

        client.on('ready', function (evt: any) {
            var list: any[] = [];
            //TODO: Log the Guild name instead (or in addition)
            client.channels.forEach((channel: any) => {
                list.push(channel.name)
            });
            console.log('connected to:', list.toString());
        });

        client.registry
            .registerGroup('fun', 'Fun')
            .registerGroup('response', 'Response')
            .registerDefaults()
            .registerCommandsIn(path.join(__dirname, './commands'));

        // authentication
        client.login(this.auth.token);

        this.commandoClient = client;

        return this;
    }

    initTwitch(): ClientSystem {
        // TODO: Import this from config file.
        const twitchOpts = {
            identity: {
                username: 'sufferingbot',
                password: this.auth.twitch
            },

            channels: [
                'Madlab96'
            ]
        }

        const twitchClient = new tmi.client(twitchOpts);

        twitchClient.connect();

        twitchClient.on('message', (target: any, context: any, msg: any, self: any) => {
            // TODO Make the prefix a regex to allow for mulitple prefix  (!, @, computer, etc.) 
            if (msg.trim()[0] === '!') {
                console.log('prefix ! found. Command:', msg.trim().slice(1));

                // Successfully recieved a message. Query the responces and commands to see if valid.
            } else {
                // ignore message, not relevent
            }
            // if(msg.includes('society') || msg.includes('joker') || msg.includes('we')) {
            //     twitchClient.say(target, 'gamer word');
            // }
            // if(msg.includes('nagger')) {
            //     twitchClient.say(target, 'ayy');
            // }
        });


        twitchClient.on('connected', (addr: any, port: any) => {
            console.log(`* Connected to ${addr}:${port}`);
        });

        this.twitchClient = twitchClient;

        return this;
    }

    initDiscord(): ClientSystem {
        const client = new Discord.Client();

        client.on('ready', () => {
            console.log(`Logged in as ${client.user.tag}!`);
        });

        client.on('message', (msg: any) => {
            if (msg.content === 'ping') {
                msg.reply('Pong!');
            }
        });

        client.login(this.auth.token);

        this.discordClient = client;
        
        return this;
    }
}