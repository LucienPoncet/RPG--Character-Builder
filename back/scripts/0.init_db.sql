DROP DATABASE IF EXISTS jdr;
DROP ROLE IF EXISTS admin_jdr;
DROP ROLE IF EXISTS jdr;

CREATE USER admin_jdr WITH PASSWORD 'admin_jdr_ngawa';
CREATE USER jdr WITH PASSWORD 'jdr_ngawa';
CREATE DATABASE jdr OWNER admin_jdr;