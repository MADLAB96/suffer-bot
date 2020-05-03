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

import { getResponses, getWatchlist } from './util/queries';

async function test() {
    console.log('responses', await getResponses());
    console.log('watchlist', await getWatchlist());
}

test();