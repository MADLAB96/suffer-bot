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
        let str = "";

        this.options.forEach(obj => {
            str += `(${obj.participants.length}) ${obj.name}\n`;
        });
       
        const embed = new RichEmbed()
        .setTitle(`** ${this.title} **`)
        .setColor(0x00FF55)
        .addField('Options', str);

        msg.channel.send(embed);
    }
    calculateWinner(msg) {
        let winner = this.options[0];
        let arr = [];
        for (let i = 0; i < this.options.length; i++) {
            if(this.options[i].participants.length > winner.participants.length) {
                winner = this.options[i];
                arr.push(this.options[i].participants.length);
            }
        }
        for (let i = 0; i < this.options.length; i++) {
            arr[i] = (Math.random() * 100 + this.options[i].participants.length);
        }
        let max = 0;
        for (let i = 0; i < this.options.length; i++) {
            if(max < arr[i]) max = arr[i];
        }
        console.log(arr.indexOf(max))

        msg.channel.send(`Winner is ${this.options[arr.indexOf(max)].name}`);
    }
    addOption(newOption, author) {
        //anyone can add an option
        //if author has vote, remove it and add to new pollOption
        // for(let i = 0; i < this.options.length; i++) {
        //     if(this.options[i].title === newOption.title) return false; //already option by that title
        //     let tempOption = new PollOption(this.options[i].name, this.options[i].participants)
        //     // this.removeDuplicateParticipant(author, tempOption);
        // }
        this.options.push(newOption);
        console.log(this.options)
        return true; //added successfully
    }
    vote(msg, pollOption, author) {
        //change vote if author already voted
        //if author has no vote, add vote. 
        //if author has vote remove it, then add vote.
        let ifOption = false;
        for(let i = 0; i < this.options.length; i++) {
            // this.options[i].removeDuplicateParticipant(author);
            console.log(this.options);
            if(this.options[i].name === pollOption.name) { 
                //should only happen once
                this.options[i].participants.push(author);
                ifOption = true;
                msg.channel.send(`Vote added for: ${pollOption.name}`);
            }
        }
        if(!ifOption) {
            //if no option is found, add one
            // this.addOption(pollOption, author); 
            msg.channel.send(`Option not found: ${pollOption.name}`);
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