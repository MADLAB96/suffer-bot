export class ClientSystem {
    constructor() {
        this.discordClient = null;
        this.twitchClient = null;   
        this.commands = [];         
        this.defaultResponses = []; // Default responses
        this.storedRessponses = []; // responses stored in database
    }
}