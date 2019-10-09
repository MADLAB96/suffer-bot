//var logger = require('winston');
var auth = require('../../../auth.json');
const axios = require('axios');
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
        var url = 'https://api.thecatapi.com/v1/breeds'
        var options = {
            headers: {
                "x-api-key": auth.catToken
            }
        };

        return axios.get(url, options).then((res: any) => {
            var breeds = res.data;

            if(args.breed === 'random') {
                url = `${BREED_URL_BASE}${getBreedId(breeds, args.breed)}`;
            } else if(args.breed.toLowerCase() === 'gif') {
                url = `https://api.thecatapi.com/v1/images/search?mime_types=gif`;
            } else if(args.breed.toLowerCase() === 'list' || args.breed.toLowerCase() === 'help') {
                help = true;
            } else { 
                url = `${BREED_URL_BASE}${getBreedId(breeds, args.breed)}`;
            }

            return axios.get(url, options).then((res: any) => {
                var json = res.data;
        
                if(help) {
                    var str = '';
                    json.forEach((catBreed: any) => {
                        str += `${catBreed.name} (${catBreed.id})\n`;
                    });
                    // TODO: huge list, fix this somehow
                    // msg.author.send(str);
                    // msg.channel.send('List sent to your PM.');
                    return str;
                } else {
                    return (json[0].url);
                }
            });
        })
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
