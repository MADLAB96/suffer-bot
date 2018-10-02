'use strict';
var logger = require('winston');

var banned = [
    "fuck",
    "shit"
]

var filtered = [
    "dog",
    "mike",
]
    // // Filter message
    // logger.info()
    // if(filteredMsg.deleteMe) {
    //     msg.channel.send(`${msg.author} No swears allowed :sweat_smile:`);
    //     msg.delete();
    // }
    // if(!filteredMsg.ifFiltered) {
    //     msg.edit(filteredMsg.message).then(console.log("eddited"));
    // }

function filter(message) {
    var tmpMsg = message;
    var ifFiltered = false;
    var deleteMe = false;
    var bannedReg = new RegExp(banned.join("|"), "i");
    var filteredReg = new RegExp(filtered.join("|"), "i");
    
    logger.info(message + bannedReg);
    logger.info(message + filteredReg);

    if(message.search(bannedReg) > -1) {
        logger.info("badword!!!");
        deleteMe = true;
    } 

    if(message.search(filteredReg) > -1) {
        tmpMsg.replace(filteredReg, '*****(_(_)=======D~~~~~');
        logger.info("LESS BAD " + tmpMsg + filteredReg);
        ifFiltered = true;
    }

    return {
        "filtered": ifFiltered,
        "message": tmpMsg,
        "deleteMe": deleteMe
    };
}

module.exports = filter;

