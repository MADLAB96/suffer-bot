export class Command {
    public name: string;

    constructor(name: any) {
        if (name) this.name = name;
        else this.name = '';
    }
}