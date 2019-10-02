/*
    what should this class do?
        - This should be the base class for all Commands and should have a run function
        - Each Command is a respnose, but each response isnt a command.
            - They both do the same thing but a command has more to it.
        */

class Response {
    public name: string;

    constructor(name: any) {
        if (name) this.name = name;
        else this.name = '';
    }
    
    send() {

    }
}

export default class Command extends Response {
    constructor(name: any) {
        super(name);
    }

    run() {

    }
}
