#!/usr/bin/env node
'use strict';

/*
    TODO:  
    - config logic from the auth.json file. EG) if twitch credentials present, call initTwitch.
*/

import TwitchClient from './TwitchClient';
import DiscordClient from './DiscordClient';
// init the client system
// let tc = new TwitchClient();
let dc = new DiscordClient();
