import { ClientType } from './Client';

// Client agnostic. We dont care as long as it follows the enum
export default class Message {
    public client: ClientType;

    // Incoming message
    public incoming: string;

    // author will be interesting: 
    //  eg) twitch will just use the username (madlab96)
    //  eg) discord has an id number as any number of users can have a username (209463122391196417) [len 18]
    public author: string;
    
    constructor(client: ClientType, incoming: string, author: string) {
        this.client = client;
        this.incoming = incoming;
        this.author = author;
    }

    formatOutgoingReply(outgoing: string): string {
        if(this.client === ClientType.Discord) {
            return this.author + ' ' + outgoing;
        } else if(this.client === ClientType.Twitch) {
            return '@' + this.author + ' ' + outgoing;
        } else {
            throw new Error('Attempt to send message to unknown Client ' + this.client);
        }
    }
}