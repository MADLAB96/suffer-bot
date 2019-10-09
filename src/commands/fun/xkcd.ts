import {Command} from '../../Command';
var axios = require('axios');

const baseURL = "http://xkcd.com/";
const jsonURL = "info.0.json";


export const Xkcd = new Command('XKCD', {
    id: "comic",
    description: "random xkcd comic",
    examples: ["!comic", "!comic <num>"],
    args: [{
        key: 'number',
        type: 'string',
        default: 'random'
    }],
    run: async (msg: any, args: any) => {
        if(args.number === 'random') {
            return randomComic(msg);
        } else {
            let num = parseInt(args.number);
            if(num !== NaN) {
                return specificComic(msg, num);
            } else {
                // TODO: Manage error
            }
        }
    }
});

function specificComic(msg: any, comicNum: any) {
    return axios(`${baseURL}${comicNum}/${jsonURL}`).then((res: any) => {
        return `${res.data.num}: ${res.data.title}\n${res.data.img}`;  
    }).catch((err: any) => {
        console.error(err)
    });
}

function randomComic(msg: any) {
    return axios.get((baseURL+jsonURL)).then((res: any) => {
        var randComic = 1 + Math.floor(Math.random() * Math.floor(res.data.num));

        return axios.get(`${baseURL}${randComic}/${jsonURL}`).then((res: any) => {
            var infoMsg = `${randComic}: ${res.data.title}\n${res.data.img}`;
            let val = new Promise((resolve, reject) => {
                resolve(infoMsg);
            });
            return val;
        }).catch((err: any) => {
            console.error(err)
        });
    }).catch((err: any) => {
        console.error(err)
    });
}