import { MessageResponse } from '../../Command';
import * as songs from "../../data/songs.json";
import * as categoryCodes from '../../data/triviaCategories.json';

const {Attachment} = require('discord.js');

// With attachments and tts
export const DISCORD_RESPONSE_LIST: MessageResponse[] = [
    new MessageResponse('Source', {id: 'source', res: 'https://github.com/MADLAB96/suffer-bot'}),
    new MessageResponse('Celeryman', {id: 'celeryman', res: 'https://www.youtube.com/watch?v=THq4b1mnxcI'}),
    new MessageResponse('Noid', {id: 'noid', res: `*${songs.noid}*`, tts: true }),
    new MessageResponse('Sharren', {id: 'sharren', res: 'why did she leave me :cry:'}),
    new MessageResponse('Squat', {id: 'squat', res: 'https://www.youtube.com/watch?v=rGVCrvvLuOc'}),
    new MessageResponse('TriviaHelp', {id: 'triviaHelp', res: "**Available Categories:**\n" + Object.keys(categoryCodes).join(", ")}),
    new MessageResponse('Water', {id: 'water', attachment: new Attachment('./src/data/water.jpg')}),
    new MessageResponse('Sitdown', {id: 'sitdown', attachment: new Attachment('./src/data/syrup.gif')}),
    new MessageResponse('Behumble', {id: 'behumble', attachment: new Attachment('./src/data/humble.gif')}),
    new MessageResponse('Syrup', {id: 'syrup', attachment: new Attachment('./src/data/sitdown.gif')}),
    new MessageResponse('Sasha', {id: 'sasha', attachment: new Attachment('./src/data/sasha.gif')}),
];

// Cannot have attachments or tts
export const TWITCH_RESPONSE_LIST: MessageResponse[] = [
    new MessageResponse('Source', {id: 'source', res: 'https://github.com/MADLAB96/suffer-bot'}),
    new MessageResponse('Celeryman', {id: 'celeryman', res: 'https://www.youtube.com/watch?v=THq4b1mnxcI'}),
    new MessageResponse('Noid', {id: 'noid', res: `*${songs.noid}*`, tts: true }),
    new MessageResponse('Sharren', {id: 'sharren', res: 'why did she leave me :cry:'}),
    new MessageResponse('Squat', {id: 'squat', res: 'https://www.youtube.com/watch?v=rGVCrvvLuOc'}),
    new MessageResponse('TriviaHelp', {id: 'triviaHelp', res: "**Available Categories:**\n" + Object.keys(categoryCodes).join(", ")}),
];