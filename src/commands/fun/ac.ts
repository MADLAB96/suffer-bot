//var logger = require('winston');
var auth = require('../../../auth.json');
var villagers = require('../../data/villagers.json').villagers;

import {Command} from '../../Command';

export const AnimalCrossing = new Command('AnimalCrossing', {
    id: "ac",
    description: "get villager information",
    aliases: ["ac", "villager"],
    examples: ["!ac bitch", "!villager slut"],
    args: [{
        key: 'name',
        type: 'string',
        default: '',
        infinite: true
    }],
    run: async (msg: any, args: any) => {
        let villagerName = args.name.join(' ');
        let foundString = 'Your search sucks lmao XD';
        console.log('villagername:', villagerName);
        if(villagerName === '') {
            return 'please provide the name of the villager';
        } else {
            await villagers.forEach((villager: any) => {
                if(villager.name.toLowerCase() === villagerName.toLowerCase()) {
                    console.log('found', villager.link);
                    foundString = villager.link;
                    return villager.link;
                }
            });
        }
        console.log('found', foundString)
        return foundString;
    }
});

