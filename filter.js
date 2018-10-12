'use strict';
var logger = require('winston');

// list of banned words
var banned = [
    "furry",
    "die",
    "犬",
    "daddy",
]

function filter(msg) {
    // create regex filter option
    var bannedReg = new RegExp(banned.join("|"), "i");
    
    if(msg.content.toLowerCase().search(bannedReg) > -1) {
        logger.info("Filtered word detected.");
        msg.channel.send(`${msg.author} No swears allowed :gun: :sweat_smile:`);
        msg.delete();
        return;
    } else {
        logger.info(`"${msg.content}" is allowed.`);
        return;
    }
}

module.exports = filter;

