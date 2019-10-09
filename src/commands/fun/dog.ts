//var logger = require('winston');
import {Command} from '../../Command';
const axios = require('axios');

var randomURL = 'https://dog.ceo/api/breeds/image/random';
var subURL = 'https://dog.ceo/api/breed/';

export const Dog = new Command('Dog', {
    id: "dog",
    description: "rnadom pup",
    aliases: ["dog", "doge", "pup"],
    args: [
        {
            key: 'breed',
            type: 'string',
            default: 'random'
        },
        {
            key: 'subBreed',
            type: 'string',
            default: 'random'
    }],
    run: async (msg: any, args: any) => {
        //logger.info(`!dog command: ${msg.author}: ${args.subBreed}+${args.breed}`);
        if(args.subBreed != "random") {
            var subBreedURL = subURL + args.breed + '/' + args.subBreed + '/images/random';
            return axios(subBreedURL.toLowerCase()).then((res: any) => {
                if(res.status != 200) {
                    return (`${msg.author} breed: '${args.breed}' or subbreed: ${args.subBreed} not found. Sub-breed list found here:
                                        https://dog.ceo/api/breed/${args.breed}/list`);
                } else {
                    return (res.data.message);
                }
            }).catch((err: any) => {
                console.error(err)
            });

            // _request(subBreedURL.toLowerCase(), function(err: any, res: any, body: any) {
            //     if(err || res.statusCode != 200) {
            //         return (`${msg.author} breed: '${args.breed}' or subbreed: ${args.subBreed} not found. Sub-breed list found here:
            //                             https://dog.ceo/api/breed/${args.breed}/list`);
            //     } else {
            //         var JSDOG = JSON.parse(body);
            //         return (JSDOG.message);
            //     }
            // });
        } else if(args.breed != "random") {
            var breedURL = subURL + args.breed + '/images/random';
            return axios(breedURL.toLowerCase()).then((res: any) => {
                if(res.status != 200) {
                    return (`${msg.author} breed: '${args.breed}' not found. List found here:
                                        https://dog.ceo/api/breeds/list/all`);
                } else {
                    return (res.data.message);
                }
            }).catch((err: any) => {
                console.error(err)
            });

            // _request(breedURL.toLowerCase(), function(err: any, res: any, body: any) {
            //     if(err || res.statusCode != 200) {
            //         return (`${msg.author} breed: '${args.breed}' not found. List found here:
            //                             https://dog.ceo/api/breeds/list/all`);
            //     } else {
            //         var JSDOG = JSON.parse(body);
            //         return (JSDOG.message);
            //     }
            // });    
        } else {
            return axios(randomURL.toLowerCase()).then((res: any) => {
                if(res.status != 200) {
                    return (`dog API === borked`);
                } else {
                    return (res.data.message);
                }
            }).catch((err: any) => {
                console.error(err)
            });
            // _request(randomURL.toLowerCase(), function(err: any, res: any, body: any) {
            //     if(err || res.statusCode != 200) {
            //         return (`dog API === borked`);
            //     } else {
            //         var JSDOG = JSON.parse(body);
            //         return (JSDOG.message);
            //     }
            // });
        }
    }
});