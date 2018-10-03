'use strict';
var logger = require('winston');

// list of banned words
var banned = [
    "fuck",
    "shit"
]

function filter(msg) {
    // create regex filter option
    var bannedReg = new RegExp(banned.join("|"), "i");
    // logger.debug(msg.content + bannedReg);

    if(msg.content.search(bannedReg) > -1) {
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

