import { isObject } from 'util';

/*
    what should this class do?
        - This should be the base class for all Commands and should have a run function
        - Each Command is a respnose, but each response isnt a command.
            - They both do the same thing but a command has more to it.
        */

export class Response {
    public name: string;
    public msg: string;
    public aliases: string[];

    constructor(name: any) {
        if (name) this.name = name;
        else this.name = '';

        this.msg = '';
        this.aliases = [];

    }
    
    // Every type of response will be sending text back. This function sends the message to the Client API 
    send(client: any) {
        // client.send(this.msg)
    }
}

export class Command extends Response {
    constructor(name: any, args: any) {
        super(name);
    }

    run() {

    }
}

export class MessageResponse extends Response {
    constructor(name: any, args: any) {
        super(name);
        this.verifyArgs(args);
    }

    verifyArgs(args: any) {
        if(!isObject(args)) throw new Error('Error validating MessageResponse arguments');
    }
}

// TODO: do this for error checking and consistency
// class ResponseArguments {

// }

// class CommandArguments extends ResponseArguments {

// }

////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// REFERENCES /////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

// DISCORDJS.COMMANDO's Command class. (for reference) 
// export class Command {
//     public constructor(client: CommandoClient, info: CommandInfo);

//     private _globalEnabled: boolean;
//     private _throttles: Map<string, object>;

//     private throttle(userID: string): object;

//     private static validateInfo(client: CommandoClient, info: CommandInfo);

//     public aliases: string[];
//     public argsCount: number;
//     public argsSingleQuotes: boolean;
//     public argsType: string;
//     public readonly client: CommandoClient;
//     public defaultHandling: boolean;
//     public description: string;
//     public details: string;
//     public examples: string[];
//     public format: string;
//     public group: CommandGroup;
//     public groupID: string;
//     public guarded: boolean;
//     public guildOnly: boolean;
//     public memberName: string;
//     public name: string;
//     public patterns: RegExp[];
//     public throttling: ThrottlingOptions;

//     public hasPermission(message: CommandMessage): boolean | string;
//     public isEnabledIn(guild: GuildResolvable, bypassGroup?: boolean): boolean;
//     public isUsable(message: Message): boolean;
//     public reload(): void;
//     public run(message: CommandMessage, args: object | string | string[], fromPattern: boolean): Promise<Message | Message[]>
//     public setEnabledIn(guild: GuildResolvable, enabled: boolean): void;
//     public unload(): void;
//     public usage(argString?: string, prefix?: string, user?: User): string;

//     public static usage(command: string, prefix?: string, user?: User): string;
// }


// DISCORDJS.COMMANDO's Command class run function. (REFERENCE for error throw, incase subclass doesn't have run function)
// async run(message, args, fromPattern) { // eslint-disable-line no-unused-vars, require-await
//     throw new Error(`${this.constructor.name} doesn't have a run() method.`);
// }