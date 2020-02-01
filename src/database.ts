var auth = require('../auth.json');
// ==========================
// ====== postgres ==========
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
    privilege privType,
    tts BOOLEAN NOT NULL,
    userName TEXT NOT NULL
);

CREATE TYPE accessType AS ENUM ('discord', 'twitch', 'slack');
CREATE TYPE privType AS ENUM ('full', 'partial', 'none');

INSERT INTO botUser (id, access, privilege, tts, userName) VALUES (DEFAULT, 'discord', 'full', true, 'madlab');
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

