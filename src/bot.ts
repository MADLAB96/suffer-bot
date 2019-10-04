#!/usr/bin/env node
'use strict';

/*
    TODO:  
    - config logic from the auth.json file. EG) if twitch credentials present, call initTwitch.
*/

var auth = require('../auth.json');
import ClientSystem from './ClientSystem';
import TwitchClient from './TwitchClient';
import DiscordClient from './DiscordClient';
// init the client system
// var cs = new ClientSystem(auth);

let tc = new TwitchClient();

let dc = new DiscordClient();