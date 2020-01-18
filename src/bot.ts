#!/usr/bin/env node
'use strict';

/*
    TODO:  
    - config logic from the auth.json file. EG) if twitch credentials present, call initTwitch.
*/

import TwitchClient from './TwitchClient';
import DiscordClient from './DiscordClient';
import auth from 'auth.json';
// init the client system
// let tc = new TwitchClient();
let dc = new DiscordClient();

// ==========================
// ====== SQLITE3 ===========
// ==========================

/*
CREATE TABLE responses (
    name TEXT PRIMARY KEY,
    response TEXT NOT NULL,
    createdBy TEXT NOT NULL,
    createdOn DATETIME DEFAULT CURRENT_TIMESTAMP
);
TODO: Add account lookup for createdBy
*/

/* 
INSERT INTO responses (
    name,
    response,
    createdBy,
    createdOn,
    tts
) VALUES (
    'testing',
    'THIS IS A TEST GAMER',
    '@Mitch',
    'dateTime()'
);
*/

// const sqlite3 = require('sqlite3').verbose();
// let db = new sqlite3.Database('./data/responses.db', sqlite3.OPEN_READWRITE, (err: any) => {
//     if (err) {
//         return console.error('err::' + err.message);
//     }
//     console.log('Connected to the in-memory SQlite database.');
// });

// ==========================
// ====== postgres ==========
// ==========================

/*

CREATE TABLE responses (
    name TEXT PRIMARY KEY,
    response TEXT NOT NULL,
    createdBy TEXT NOT NULL,
    createdOn DATE DEFAULT CURRENT_TIMESTAMP,
    tts BOOLEAN NOT NULL
);
TODO: Add account lookup for createdBy

INSERT INTO responses(
    name, response, createdBy, tts
) VALUES (
    'test', 'TESTING GAMERS', '@mitch', false
);
*/

const { Pool } = require('pg');
// your credentials
const DATABASE_URL = `postgres://${auth.pdUser}:${auth.pdPass}@127.0.0.1:5432/bot`;

const pool = new Pool({
  connectionString: DATABASE_URL
});

// a generic query, that executes all queries you send to it
function query(text: any) {
  return new Promise((resolve, reject) => {
    pool
      .query(text)
      .then((res: any) => {
        resolve(res);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}


const User = {
  async readAll() {
    try {
      const readAllQuery = 'SELECT * FROM responses';
      const { rows } :any = await query(readAllQuery);
      console.log(rows);
    } catch (error) {
        console.log(error);
    }
  }
};

User.readAll();