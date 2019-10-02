'use strict';
import { MessageResponse } from '../Command';

module.exports = class Source extends MessageResponse {
    constructor(client: any) {
        super(client, {
            name: "source",
            description: "source",
            group: 'response',
            memberName: "source",
            examples: ["!source"],
        });
    }
    async run(msg: any) {
        msg.channel.send(`${msg.author} https://github.com/MADLAB96/suffer-bot`);
    }
}

let sourceResponse = new MessageResponse('Source',  { name: "source",
                                            description: "source",
                                            group: 'response',
                                            memberName: "source",
                                            examples: ["!source"],
                                            response: 'https://github.com/MADLAB96/suffer-bot'
                                        });