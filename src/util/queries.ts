// file holds the functions to query the postgresql database
// will break out into other files based on tables if it gets big enough

const { Pool } = require('pg');
var auth = require('../../auth.json');

// your credentials
const DATABASE_URL = `postgres://${auth.pdUser}:${auth.pdPass}@127.0.0.1:5432/${auth.dbName}`;
const pool = new Pool({
    connectionString: DATABASE_URL
});

// Query Ran at startup to initialize the available responses
export async function getResponses() {
    try {
        const readAllQuery = 'SELECT * FROM response';
        const { rows } : any = await query(readAllQuery);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

export async function addResponse(responseName: any, responseMsg: any) {
    try {
        const readAllQuery = `INSERT INTO response(name, response, createdby, tts) values('${responseName}', '${responseMsg}', 1, false);`;
        const { rows } : any = await query(readAllQuery);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

export async function addMovie(movieName: String) {
    try {
        // TOOD add the user functionality here. (createdby)
        const readAllQuery = `INSERT INTO movies(name, ifWatched, createdby) values('${movieName}', false, 1);`;
        const { rows } : any = await query(readAllQuery);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

export async function watchedMovie(movieName: String) {
    try {
        const readAllQuery = `UDPATE movies SET ifWatched = true WHERE name = '${movieName}';`;
        const { rows } : any = await query(readAllQuery);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

export async function getAllMovies() {
    try {
        const readAllQuery = 'SELECT * FROM movies;';
        const { rows } : any = await query(readAllQuery);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

export async function getWatchlist() {
    try {
        const readAllQuery = 'SELECT * FROM movies WHERE isWatched == true;';
        const { rows } : any = await query(readAllQuery);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

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