## Suffer-Bot

Barebones discord bot for personal use, will hopefully become something useful one day. *but not likely* 
Currently running on a raspberry pi at home, being used in a couple of servers. 

* prerequisites: discord account
* will have to get your own auth token from https://discordapp.com/developers/applications/
* I followed this to get started https://medium.com/davao-js/tutorial-creating-a-simple-discord-bot-9465a2764dc0 most of it is outdated though

### Install and run
* install node.js & npm latest
`npm install`
`npm start`
* adding and modifying `auth.json`.
    * just create a file called `auth.json` and add your token like this to the file: `{ "token": "YOUR_TOKEN_HERE" }`


url to add your bot to the server *i kept forgetting where it was*

https://discordapp.com/oauth2/authorize?&client_id=YOUR_CLIENT_ID_HERE&scope=bot&permissions=0

### Todo
 - more commands
    - urban dictionary
    - lunch command
    - Pet Bomb

### TODO API tokens documentation
