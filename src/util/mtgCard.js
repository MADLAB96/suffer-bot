const {RichEmbed} = require('discord.js');

module.exports = function embedMessage(cardObj) {
    const embed = new RichEmbed()
        .setTitle(cardObj.name)
        .setColor(0x00FF55)
        .setImage(cardObj.image_uris.normal)
        .addField('Est. Price', `$${cardObj.usd}`);

    return embed;
}