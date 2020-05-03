var auth = require('../auth.json');
// ==========================
// ====== postgres ==========
// ==========================


// ==========================
// THIS IS MOVIE NIGHT COMMAND
// ==========================
//  - Will be able to add movies to 'watchlist'
//    - movies can be removed or changed to watch
//    - TODO: add ratings table
//    - TODO: add movie database scraping for genre and other misc data. 
//  - Watchlist will be get(movies where ifWatched == false)
//  - TODO: add random picker
// ==========================
/*
CREATE TABLE movies (
    name TEXT PRIMARY KEY UNIQUE,
    ifWatched BOOLEAN DEFAULT FALSE,
    createdBy INTEGER NOT NULL,
    createdOn DATE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_id FOREIGN KEY (createdBy) REFERENCES botUser(id)
);

CREATE TYPE accessType AS ENUM ('discord', 'twitch', 'slack');
CREATE TYPE privType AS ENUM ('full', 'partial', 'none');

INSERT INTO botUser (id, access, privilege, tts, userName) VALUES (DEFAULT, 'discord', 'full', true, 'madlab');
INSERT INTO response (name, response, createdBy, tts) VALUES ('test1', 'this is a test', 1, false);
*/

// ==========================
// THIS IS RESPONSE COMMAND
// ==========================
//  - Here are the loaded commands
//  - TODO: dont use those ENUMs. the other services aren't being used anyways.
// ==========================
/*
CREATE TABLE response (
    name TEXT PRIMARY KEY UNIQUE,
    response TEXT NOT NULL,
    createdBy INTEGER NOT NULL,
    createdOn DATE DEFAULT CURRENT_TIMESTAMP,
    tts BOOLEAN NOT NULL,
    CONSTRAINT fk_user_id FOREIGN KEY (createdBy) REFERENCES botUser(id)
);

CREATE TABLE botUser (
    id SERIAL UNIQUE,
    access accessType,
    tts BOOLEAN NOT NULL,
    userName TEXT NOT NULL
);

CREATE TABLE botUser (
    id SERIAL UNIQUE,
    access accessType,
    privilege privType DEFAULT 'full',
    tts BOOLEAN NOT NULL,
    userName TEXT NOT NULL
);

CREATE TYPE accessType AS ENUM ('discord', 'twitch', 'slack');
CREATE TYPE privType AS ENUM ('full', 'partial', 'none');

INSERT INTO botUser (id, access, tts, userName) VALUES (DEFAULT, 'discord', true, 'madlab');
INSERT INTO response (name, response, createdBy, tts) VALUES ('test1', 'this is a test', 1, false);
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


export default {
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

