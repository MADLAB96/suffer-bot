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
async function getResponses() {
    try {
        const readAllQuery = 'SELECT * FROM response';
        const { rows } : any = await query(readAllQuery);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

async function addResponse(responseName: any, responseMsg: any) {
    try {
        const readAllQuery = `INSERT INTO response(name, response, createdby, tts) values('${responseName}', '${responseMsg}', 1, false);`;
        const { rows } : any = await query(readAllQuery);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

async function addMovie(movieName: String) {
    try {
        // TOOD add the user functionality here. (createdby)
        const readAllQuery = `INSERT INTO movies(name, ifWatched, createdby) values('${movieName}', false, 1);`;
        const { rows } : any = await query(readAllQuery);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

async function watchedMovie(movieName: String) {
    try {
        const readAllQuery = `UDPATE movies SET ifWatched = true WHERE name = '${movieName}';`;
        const { rows } : any = await query(readAllQuery);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

async function getAllMovies() {
    try {
        const readAllQuery = 'SELECT * FROM movies;';
        const { rows } : any = await query(readAllQuery);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

async function getWatchlist() {
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

module.exports = {
    getResponses,
    addResponse,
    addMovie,
    watchedMovie,
    getAllMovies
}
