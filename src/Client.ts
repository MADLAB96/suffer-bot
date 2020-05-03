import { MessageResponse, Command } from './Command';

export class Client {
    public type: ClientType;
    public clientObj: any;
    public defaultCommands: Command[]; // TODO: Create class for ResponseGroup
    public defaultResponses: MessageResponse[]; // TODO: Create class for ResponseGroup
    public storedResponses: MessageResponse[];

    constructor(type: ClientType) {
        this.type = type; // replace with ClientType later??
        this.clientObj = {};
        this.defaultResponses = [];
        this.defaultCommands = [];
        this.storedResponses = [];
    }


    init() {
        //where the client starts its listeners    
        throw new Error(`${this.type} Client does not have a init function`);
    }

    load() {
        //where the clinet loads responses & commands (may want to do separate functions we'll see)
        throw new Error(`${this.type} Client does not have a load function`);
    }
}

export enum ClientType {
    Twitch = 'Twitch', 
    Discord = 'Discord'
}