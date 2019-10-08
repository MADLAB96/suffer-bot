import { isObject } from 'util';
import { CommandArgs, ResponseArgs, RunArgs } from './Arguments';

/*
    what should this class do?
        - This should be the base class for all Commands and should have a run function
        - Each Command is a respnose, but each response isnt a command.
            - They both do the same thing but a command has more to it.
*/

export class Response {
    public name: string;
    public res: string;
    public aliases: string[] | undefined;
    public tts: boolean | undefined;
    public attachment: any;

    constructor(name: any) {
        if (name) this.name = name;
        else this.name = '';

        this.res = '';
        this.aliases = [];

    }
}

export class Command extends Response {
    public id: string;
    public description: string;
    public aliases: string[] | undefined;
    public examples: string[] | undefined;
    public runArgs: RunArgs[] | undefined;
    public parsedArgs: any;

    constructor(name: any, commandArgs: CommandArgs) {
        super(name);
        this.id = '';
        this.description = '';
        this.aliases = [];
        this.examples = [];
        this.runArgs = [];
        this.parsedArgs = {};
        this.verifyArgs(commandArgs);
    }

    verifyArgs(args: CommandArgs)  {
        this.id = args.id;
        this.description = args.description;
        this.aliases = args.aliases;
        this.examples = args.examples;
        this.runArgs = args.args;
        this.run = args.run;

        this.initRunArgs();
    }

    public newCall(...args: any[]) {
        // TODO: more error checking, this is the most important function for when a command is called.
        // assumes passes args and this.parsedArgs will have smae length
        args = args[0];
        console.log('args', args, args.length)
        for(let i = 0; i < args.length; i++) {
            let keys = Object.keys(this.parsedArgs)
            console.log('args @ i', i, args)
            this.parsedArgs[keys[i]] = args[i];
        }
        console.log('parsed', this.parsedArgs)
        return this.parsedArgs;
    }

    private handleIntegerArg(arg: RunArgs, val?: number) {
        // TODO: add error checking here (assumed its an integer)
        if(arg.default) {
            this.parsedArgs[arg.key] = parseInt(arg.default);
        }
        else {
            this.parsedArgs[arg.key] = 0;
        }
    }

    private handleStringArg(arg: RunArgs, val?: string) {
        // TODO: add error checking here (assumed its an string)
        if(arg.default)
            this.parsedArgs[arg.key] = arg.default;
        else 
            this.parsedArgs[arg.key] = '';
    }

    private initRunArgs() {
        if (this.runArgs) {
            this.runArgs.forEach((arg) => {
                switch(arg.type) {
                    case 'integer':
                        this.handleIntegerArg(arg);
                        break;
                    case 'string':
                        this.handleStringArg(arg);
                        break;
                    default:
                        throw new Error(`Command ${this.name} ArgType.type: ${arg.type} is not supported`);
                }
            })    
        } else {
            throw new Error(`Command ${this.name} does not have a RunArgs[]`);
        }
    }

    async run(msg: any, args: any)  {
        throw new Error(`Command ${this.name} does not have a run function`);
    }
}

export class MessageResponse extends Response {
    public id: string;

    constructor(name: any, args: ResponseArgs) {
        super(name);
        this.id = '';
        this.verifyArgs(args);
    }

    verifyArgs(args: ResponseArgs) {
        if(!isObject(args)) throw new Error('Error validating MessageResponse arguments');
        else {
            this.id = args.id;
            this.res = args.res;
            this.aliases = args.aliases;
            this.attachment = args.attachment;
        }
    }
}