'use strict';

var banned = [
    "fuck",
    "shit"
]

var filtered = [
    "dog",
    "mike",
]

function filter(message) {
    banned.forEach(word => {
        var reg = new RegExp(word);
        if(message.search(reg) != 0) {
            return null;
        }
    });

    var tmpMsg = message;
    var ifFiltered = false;
    
    filtered.forEach(word => {
        var reg = new RegExp(word);
        if(tmpMsg.search(reg) != 0) {
            tmpMsg.replace(reg, ':b:itch');
            ifFiltered = true;
        }
    });
    return {
        "filtered": ifFiltered,
        "message": tmpMsg,
    };
}

module.exports = filter;

