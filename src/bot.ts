#!/usr/bin/env node
'use strict';

var auth = require('../auth.json');
var ClientSystem = require('./ClientSystem');

var cs = new ClientSystem(auth);

cs.initTwitch();
cs.initDiscord();