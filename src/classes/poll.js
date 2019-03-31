const { RichEmbed } = require('discord.js');

module.exports = class Poll {
    constructor(author, channel, title, option) {
        this.author = author.id;
        this.title = title;
        this.channel = channel;
        this.options = (option ? [option] : []);
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
        .addField('Options', this.options
                    .map((str, i) => `(${i+1}) ${h2p(str)}`).join("\n"));

        msg.channel.send(embed);
    }
    calculateWinner() {

    }
    addOption(pollOption) {
        //anyone can add an option
        //if author has vote, remove it and add to new pollOption
    }
    vote(pollOption, author) {
        //change vote if author already voted
        //if author has no vote, add vote. 
    }
}