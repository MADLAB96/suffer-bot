const {RichEmbed} = require('discord.js');

module.exports = function embedMessage(cardObj) {
    if(cardObj.card_faces) {
        const embed = new RichEmbed()
            .setTitle(cardObj.card_faces[0].name + " (Flip Card)")
            .setColor(0x00FF55)
            .setImage(cardObj.card_faces[0].image_uris.normal)
            .addField('Est. Price', `$${cardObj.usd}`)
            .addField('Link', `[scryfall](${cardObj.scryfall_uri})`);
        return embed;
    } else {
        const embed = new RichEmbed()
            .setTitle(cardObj.name)
            .setColor(0x00FF55)
            .setImage(cardObj.image_uris.normal)
            .addField('Est. Price', `$${cardObj.usd}`)
            .addField('Link', `[scryfall](${cardObj.scryfall_uri})`);
        return embed;
    }
}