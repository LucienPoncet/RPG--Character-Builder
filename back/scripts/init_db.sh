export PGPORT=5432

export PGUSER=postgres
export PGPASSWORD=postgres

psql -f ./scripts/0.init_db.sql

export PGUSER=admin_jdr
export PGPASSWORD=admin_jdr_ngawa

export PGDATABASE=jdr

psql -f ./scripts/1.create_tables.sql

psql -f ./scripts/2.functions.sql