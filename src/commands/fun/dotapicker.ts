var heroes = require('../../../data/dotaheros.json').heroes;
import {Command} from '../../Command';

export const DotaPicker = new Command('DotaPicker', {
    id: "dotapicker",
    description: "get a random dota hero",
    aliases: ["heropicker", "dota", "picker", "dotapicker"],
    examples: ["computer heropicker", "computer heropicker randomDraft"],
    args: [{
        key: 'gamemode',
        type: 'string',
        default: 'allpick'
    }],
    run: async (msg: any, args: any) => {
        // heroes = heroes.heroes;
        switch (args.gamemode) {
            case 'allpick':
                let i = Math.floor(Math.random() * heroes.length);
                return (`${msg.author} will play ${heroes[i].localized_name}`);
            case 'singleDraft':
                let hero1 = heroes[Math.floor(Math.random() * heroes.length)].localized_name;
                let hero2 = heroes[Math.floor(Math.random() * heroes.length)].localized_name;
                let hero3 = heroes[Math.floor(Math.random() * heroes.length)].localized_name;
                return (`${msg.author} will chose from ${hero1}, ${hero2}, ${hero3}`);
            default:
                return (`${msg.author} Invalid game mode, pick from: allpick (default), randomDraft (3 heros)`);
        }
    }
});