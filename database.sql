

DROP TABLE IF EXISTS visited_countries, users;

CREATE TABLE users(
id SERIAL PRIMARY KEY,
name VARCHAR(15) UNIQUE NOT NULL,
color VARCHAR(15)
);
CREATE TABLE countries(
id SERIAL PRIMARY KEY,
country_code CHAR(2) NOT NULL,
);

CREATE TABLE visited_countries(
id SERIAL PRIMARY KEY,
user_id INTEGER REFERENCES users(id)
country_id INTEGER REFERENCES countries(id)
);
INSERT INTO countries(country_code)
VALUES('IN');
INSERT INTO visited_countries (user_id,country_id)
VALUES (1,1);


