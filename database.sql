

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
INSERT INTO countries(country_code)
VALUES('CI');
INSERT INTO countries(country_code)
VALUES('CL');
INSERT INTO countries(country_code)
VALUES('CM');
INSERT INTO countries(country_code)
VALUES('CN');
INSERT INTO countries(country_code)
VALUES('CO');
INSERT INTO countries(country_code)
VALUES('CR');
INSERT INTO countries(country_code)
VALUES('CU');
INSERT INTO countries(country_code)
VALUES('CY');
INSERT INTO countries(country_code)
VALUES('CZ');
INSERT INTO countries(country_code)
VALUES('DE');
INSERT INTO countries(country_code)
VALUES('DJ');
INSERT INTO countries(country_code)
VALUES('DK');
INSERT INTO countries(country_code)
VALUES('DO');
INSERT INTO countries(country_code)
VALUES('DZ');
INSERT INTO countries(country_code)
VALUES('EC');
INSERT INTO countries(country_code)
VALUES('EE');
INSERT INTO countries(country_code)
VALUES('EG');
INSERT INTO countries(country_code)
VALUES('EH');
INSERT INTO countries(country_code)
VALUES('ER');
INSERT INTO countries(country_code)
VALUES('ES');
INSERT INTO countries(country_code)
VALUES('ET');
INSERT INTO countries(country_code)
VALUES('FK');
INSERT INTO countries(country_code)
VALUES('FI');
INSERT INTO countries(country_code)
VALUES('FJ');
INSERT INTO countries(country_code)
VALUES('FR');
INSERT INTO countries(country_code)
VALUES('GA');
INSERT INTO countries(country_code)
VALUES('GB');
INSERT INTO countries(country_code)
VALUES('GE');
INSERT INTO countries(country_code)
VALUES('GF');
INSERT INTO countries(country_code)
VALUES('GH');
INSERT INTO countries(country_code)
VALUES('GL');
INSERT INTO countries(country_code)
VALUES('GM');
INSERT INTO countries(country_code)
VALUES('GN');
INSERT INTO countries(country_code)
VALUES('GQ');



