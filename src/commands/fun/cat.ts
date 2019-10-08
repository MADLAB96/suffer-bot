var _request = require('request');
//var logger = require('winston');
var auth = require('../../../auth.json');
import {Command} from '../../Command';

const MAX_PAGE_NUM = 2806;
const BREED_URL_BASE = "https://api.thecatapi.com/v1/images/search?breed_ids=";

export const Cat = new Command('Cat', {
    id: "cat",
    description: "random cat",
    aliases: ["kitty", "meow"],
    examples: ["!cat"],
    args: [{
        key: 'breed',
        type: 'string',
        default: 'random'
    }],
    run: async (msg: any, args: any) => {
        var help = false;

        var options = {
            url: 'https://api.thecatapi.com/v1/breeds',
            headers: {
                "x-api-key": auth.catToken
            }
        };

        _request(options, function(err: any, res: any, body: any) {
            if(err) {
                msg.channel.send('mewed :3');
            } else {
                var breeds = JSON.parse(body);

                if(args.breed === 'random') {
                    options.url = `${BREED_URL_BASE}${getBreedId(breeds, args.breed)}`;
                } else if(args.breed.toLowerCase() === 'gif') {
                    options.url = `https://api.thecatapi.com/v1/images/search?mime_types=gif`;
                } else if(args.breed.toLowerCase() === 'list' || args.breed.toLowerCase() === 'help') {
                    help = true;
                } else { 
                    options.url = `${BREED_URL_BASE}${getBreedId(breeds, args.breed)}`;
                }
    
                _request(options, function(err: any, res: any, body: any) {
                    //logger.info(`!cat command: ${msg.author} ${args.breed}`);
                    if(err) {
                        msg.channel.send('mewed :3');
                    } else {
                        var json = JSON.parse(body);
        
                        if(help) {
                            var str = '';
                            json.forEach((catBreed: any) => {
                                str += `${catBreed.name} (${catBreed.id})\n`;
                            });
                            msg.author.send(str);
                            msg.channel.send('List sent to your PM.');
                        } else {
                            msg.channel.send(json[0].url);
                        }
                    }
                });
            }
        });
    }
});

function getBreedId(list: any, search: any) {
    var id = '';
    list.forEach((breed: any) => {
        if(breed.name == search || breed.id == search) {
            id = breed.id;
        }
    });
    return id;
}
