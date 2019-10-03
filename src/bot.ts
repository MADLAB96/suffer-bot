#!/usr/bin/env node
'use strict';

/*
    TODO:  
    - config logic from the auth.json file. EG) if twitch credentials present, call initTwitch.
*/

var auth = require('../auth.json');
import ClientSystem from './ClientSystem';

// init the client system
var cs = new ClientSystem(auth);

// init twitch client
cs.initTwitch();
// init discord client (commando) **temporary**
// cs.initCommando();
// init discord.js client 
cs.initDiscord();

