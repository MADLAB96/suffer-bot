module.exports = class PollOption {
    constructor(name, author) {
        this.name = name;
        this.votes = 0;
        this.participants = [author];
    }
}