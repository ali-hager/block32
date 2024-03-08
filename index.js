const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/acme_notes_crud_db');
const express = require('express');

const init = async() => {
  console.log('connecting to database');
  await client.connect();
  console.log('connected to database');
  let SQL = `
    DROP TABLE IF EXISTS notes;
    CREATE TABLE notes(
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),
    ranking INTEGER DEFAULT 3 NOT NULL,
    txt VARCHAR(255) NOT NULL
    );
  `;
  await client.query(SQL);
  console.log('tables created');

  SQL = `
      INSERT INTO notes(txt) VALUES('hello');
      INSERT INTO notes(txt, ranking) VALUES('world', 3);
      INSERT INTO notes(ranking, txt) VALUES(3, 'hello world again!')
  `;
await client.query(SQL);
console.log('data seeded');
}

init();