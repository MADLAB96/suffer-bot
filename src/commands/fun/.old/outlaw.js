// 'use strict';
// var commando = require("discord.js-commando");
// var fs = require('fs');
// var outlawStorage = "./data/outlawData.json";
// var Outlaw = require('../../../classes/outlaw');

// function ifAuthorHasOutlaw(author) {
//     var found = false;
//     var data = fs.readFileSync(outlawStorage, 'utf8');
//     var obj = JSON.parse(data);
//     obj.outlaws.forEach(outlaw => {
//         if(outlaw.author === author.id) { 
//             found = true;
//         }
//     });
//     return found;
// }

// function store(msg, outlaw) {
//     fs.readFile(outlawStorage, 'utf8', (err, data) => {
//         if(err) {
//             console.log(err);
//         } else {
//             var obj = JSON.parse(data);
//             obj.outlaws.push(outlaw);
//             // console.log(obj.outlaws)
//             var json = JSON.stringify(obj);
//             fs.writeFile(outlawStorage, json, 'utf8', (err) => {
//                 if(err) console.log(err);
//             });
//             msg.channel.send(`${msg.author} your outlaw: ${outlaw.nickname} has been born.`);            
//         }
//     });
// }

// function sendDesc(msg) {
//     var found = false;
//     fs.readFile(outlawStorage, 'utf8', (err, data) => {
//         if(err) {
//             console.log(err);
//         } else {
//             var obj = JSON.parse(data);
//             obj.outlaws.forEach(outlaw => {
//                 if(outlaw.author === msg.author.id) {
//                     found = true;
//                     msg.channel.send(`${msg.author}\n${outlaw.nickname} Wanted Dead or Alive\nFor ${outlaw.kills} kills\nReward $$ ${outlaw.bounty} $$`);
//                 }
//             });
//             if(!found) {
//                 msg.channel.send(`${msg.author} you don't have an Outlaw yet.`);
//             }
//         }
//     });
// }

// // module.exports = Outlaw;
// module.exports = class OutlawCMD extends commando.Command {
//     constructor(client) {
//         super(client, {
//             name: "outlaw",
//             description: "what in tarnation",
//             group: 'fun',
//             memberName: "outlaw",
//             examples: ["!duel <name> <description>"],
//             args: [{
//                     key: 'name',
//                     prompt: 'nickname of your outlaw',
//                     type: 'string',
//                     default: "give-description"
//                 },
//                 {
//                     key: 'desc',
//                     prompt: 'description of your outlaw',
//                     type: 'string',
//                     default: "give-description",
//                     // infinite: true, 
//                 }
//             ]
//         });
//     }
//     async run(msg, args) {
//         if(args.name === "give-description" && args.desc === "give-description") {
//             // TODO send detail message
//             sendDesc(msg);
//         } else if(!ifAuthorHasOutlaw(msg.author)) {
//             // create and store outlaw
//             var outlaw = new Outlaw(msg.author, args.name, args.desc);
//             store(msg, outlaw);
//         } else {
//             // send msg that outlaw exists
//             var data = fs.readFileSync(outlawStorage, 'utf8');
//             var obj = JSON.parse(data);
//             obj.outlaws.forEach(outlaw => {
//                 if(outlaw.author === msg.author.id) {
//                     msg.channel.send(`${msg.author} already has an outlaw named: ${outlaw.nickname}`);
//                 }
//             });
//         }
//     }
// }
