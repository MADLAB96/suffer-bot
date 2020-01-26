//var logger = require('winston');
import {Command} from '../../Command';
const axios = require('axios');

export const AddResponse = new Command('AddResponse', {
    id: "addResponse",
    description: "add a text response to response list",
    aliases: ["add", "addResponse"],
    args: [
        {
            key: 'name',
            type: 'string',
            default: ''
        },
        {
            key: 'response',
            type: 'string',
            default: 'random',
            infinite: true
    }],
    run: async (msg: any, args: any) => {
        var sqlite3 = require('sqlite3').verbose();
        var db = new sqlite3.Database('~/ressponses.db', sqlite3.OPEN_READWRITE, (err: any) => {
		if (err) { console.error(err.message); }
		console.log('connected to db');
	});

        db.serialize(function () {
            var stmt = db.prepare('INSERT INTO responses(name, response, tts, author, creationDate) values("ayy", "lmao", 0, "madlab", date("now"));');

            stmt.finalize();
        });

        db.close();
	return "it worked!"
    }
});
