import { MessageResponse } from '../../Command';
import * as songs from "../../../data/songs.json";
import * as categoryCodes from '../../../data/triviaCategories.json';

export const MessageResponseList: MessageResponse[] = [
    new MessageResponse('Source', {id: 'source', res: 'https://github.com/MADLAB96/suffer-bot'}),
    new MessageResponse('Celeryman', {id: 'celeryman', res: 'https://www.youtube.com/watch?v=THq4b1mnxcI'}),
    new MessageResponse('Noid', {id: 'noid', res: `*${songs.noid}*`, tts: true }),
    new MessageResponse('Sharren', {id: 'sharren', res: 'why did she leave me :cry:'}),
    new MessageResponse('Squat', {id: 'squat', res: 'https://www.youtube.com/watch?v=rGVCrvvLuOc'}),
    new MessageResponse('TriviaHelp', {id: 'triviaHelp', res: "**Available Categories:**\n" + Object.keys(categoryCodes).join(", ")}),
];

