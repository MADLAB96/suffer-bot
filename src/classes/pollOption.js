module.exports = class PollOption {
    constructor(name, author) {
        this.name = name;
        console.log(author);
        if(!author.isArray) {
            this.participants = [author];
        } else {
            this.participants = author;
        }
    }
    removeDuplicateParticipant(author) {
        for(let i = 0; i < this.participants.length; i++) {
            if(this.participants[i] === author) {
                this.participants.splice(i, 1);
            }
        }
    }
}