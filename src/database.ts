var auth = require('../auth.json');
// ==========================
// ====== postgres ==========
// ==========================

/*
CREATE TABLE response (
    name TEXT PRIMARY KEY,
    response TEXT NOT NULL,
    createdBy TEXT NOT NULL,
    createdOn DATE DEFAULT CURRENT_TIMESTAMP,
    tts BOOLEAN NOT NULL,
    CONSTRAINT fk_user_id FOREIGN KEY (createdBy) REFERENCES botUsers(id)
);

CREATE TABLE botUser (
    id SERIAL,
    type: accessType,
    privliage: privType
    tts: BOOLEAN NOT NULL,
    userName: TEXT NOT NULL
);

CREATE TYPE accessType AS ENUM ('discord', 'twitch', 'slack');
CREATE TYPE privType AS ENUM ('full', 'partial', 'none');

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