const { RichEmbed } = require('discord.js');

module.exports = class Poll {
    constructor(author, channel, title, option) {
        this.author = author;
        this.title = title;
        this.channel = channel;
        if(option.isArray !== undefined) {
            this.options = (option ? [option] : []);
        } else {
            this.options = option;
        }
        this.startTime = Date.now();
    }
    displayInfo(msg) {
        //send message of their outlaw info
        let options = [];

        this.options.forEach(obj => {
            options.push(obj.name);
        });
       
        const embed = new RichEmbed()
        .setTitle(`** ${this.title} **`)
        .setColor(0x00FF55)
        .addField('Options', options.map((str, i) => `(${i+1}) ${(str)}`).join("\n"));

        msg.channel.send(embed);
    }
    calculateWinner(msg) {
        let winner = this.options[0];
        for (let i = 0; i < this.options.length; i++) {
            if(this.options[i].participants.length > winner.participants.length) {
                winner = this.options[i];
            }
        }
        msg.channel.send(`Winner is ${winner.name}`);
    }
    addOption(newOption, author) {
        //anyone can add an option
        //if author has vote, remove it and add to new pollOption
        for(let i = 0; i < this.options.length; i++) {
            if(this.options[i].title === newOption.title) return false; //already option by that title
            let tempOption = new PollOption(this.options[i].name, this.options[i].participants)
            this.removeDuplicateParticipant(author, tempOption);
        }
        this.options.push(newOption);
        return true; //added successfully
    }
    vote(pollOption, author) {
        //change vote if author already voted
        //if author has no vote, add vote. 
        //if author has vote remove it, then add vote.
        let ifOption = false;
        for(let i = 0; i < this.options.length; i++) {
            this.options[i].removeDuplicateParticipant(author);
            if(this.options[i].title === pollOption.title) { 
                //should only happen once
                this.options[i].participants.push(author);
                ifOption = true;
            }
        }
        if(!ifOption) {
            //if no option is found, add one
            this.addOption(pollOption, author); 
        } 
    }
    removeDuplicateParticipant(option, author) {
        for(let i = 0; i < this.participants.length; i++) {
            if(this.participants[i] === author) {
                this.participants.splice(i, 1);
            }
        }
    }
}