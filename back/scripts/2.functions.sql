BEGIN;

ALTER DEFAULT PRIVILEGES FOR ROLE admin_jdr IN SCHEMA public
GRANT EXECUTE ON FUNCTIONS TO jdr;


-- Compétences Primaires :
CREATE OR REPLACE FUNCTION get_all_primary_skills() RETURNS SETOF primary_skill AS $$
	SELECT * FROM primary_skill;
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION find_primary_skill_by_id(int) RETURNS primary_skill AS $$
	SELECT * FROM primary_skill WHERE id=$1;
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION insert_primary_skill(psk json) RETURNS primary_skill AS $$
	INSERT INTO primary_skill
	(label,"value")
		VALUES
	(
		psk->>'label',
		(psk->>'value')::int
	)
	RETURNING *;
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION update_primary_skill(psk json) RETURNS primary_skill AS $$
	UPDATE primary_skill SET
		"label"=psk->>'label',
		"value"=(psk->>'value')::int
	WHERE "id"=(psk->>'id')::int
	RETURNING *;
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION delete_primary_skill(int) RETURNS void AS $$
	DELETE FROM primary_skill 
	WHERE "id"=$1;
$$ LANGUAGE sql SECURITY DEFINER;


-- Statistiques Primaires :
CREATE OR REPLACE FUNCTION get_all_primary_statistics() RETURNS SETOF primary_statistic AS $$
	SELECT * FROM primary_statistic;
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION find_primary_statistic_by_id(int) RETURNS primary_statistic AS $$
	SELECT * FROM primary_statistic WHERE id=$1;
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION insert_primary_statistic(pst json) RETURNS primary_statistic AS $$
	INSERT INTO primary_statistic
	(label,"value")
		VALUES
	(
		pst->>'label',
		(pst->>'value')::int
	)
	RETURNING *;
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION update_primary_statistic(pst json) RETURNS primary_statistic AS $$
	UPDATE primary_statistic SET
		"label"=pst->>'label',
		"value"=(pst->>'value')::int
	WHERE "id"=(pst->>'id')::int
	RETURNING *;
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION delete_primary_statistic(int) RETURNS void AS $$
	DELETE FROM primary_statistic
	WHERE "id"=$1;
$$ LANGUAGE sql SECURITY DEFINER;


-- Personnages :
CREATE OR REPLACE FUNCTION get_all_characters() RETURNS SETOF "character" AS $$
	SELECT * FROM "character";
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_all_characters_by_user(int) RETURNS SETOF "character" AS $$
	SELECT DISTINCT "character"
	FROM "user" JOIN "character" ON "user".id = character.user_id
	WHERE "user".id=$1;
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION find_character_by_id(int) RETURNS "character" AS $$
	SELECT * FROM "character" WHERE id=$1;
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION insert_character(ch json) RETURNS "character" AS $$
	INSERT INTO "character"
	(firstname, lastname, "level", class_id, race_id, user_id)
		VALUES
	(
		ch->>'firstname',
		ch->>'lastname',
		(ch->>'level')::int,
		(ch->>'class_id')::int,
		(ch->>'race_id')::int,
		(ch->>'user_id')::int
	)
	RETURNING *;
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION update_character(ch json) RETURNS "character" AS $$
	UPDATE "character" SET
		"firstname"=ch->>'firstname',
		"lastname"=ch->>'lastname',
		"level"=(ch->>'level')::int,
		"class_id"=(ch->>'class_id')::int,
		"race_id"=(ch->>'race_id')::int,
		"user_id"=(ch->>'user_id')::int
	WHERE "id"=(ch->>'id')::int
	RETURNING *;
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION delete_character(int) RETURNS void AS $$
	DELETE FROM "character"
	WHERE "id"=$1;
$$ LANGUAGE sql SECURITY DEFINER;


-- Utilisateurs :
CREATE FUNCTION add_user(u json) RETURNS "user" AS $$
	INSERT INTO "user"
	(email,password,lastname,firstname)
	VALUES
	(
		u->>'email',
		u->>'password',
		u->>'lastname',
		u->>'firstname'
	)
	RETURNING *;
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION verify_user(json) RETURNS json AS $$
DECLARE
	user_found json;
BEGIN
	SELECT json_build_object(
		'id',id,
		'email',email,
		'lastname',lastname,
		'firstname',firstname,
		'role',role
	) INTO user_found
	FROM "user"
	WHERE email = $1->>'email' AND password = $1->>'password';
	
	IF user_found IS NOT NULL
	THEN
		return user_found;
	ELSE
		return null;
	END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE FUNCTION get_user(int) RETURNS "user" AS $$
	SELECT * FROM "user" WHERE id=$1;
$$ LANGUAGE sql SECURITY DEFINER;

-- Races en Many to Many :
CREATE OR REPLACE FUNCTION link_primary_skills_races(linkpsk json) RETURNS "race_has_primary_skill" AS $$
	INSERT INTO "race_has_primary_skill"
	(race_id, primary_skill_id)
		VALUES
	(
		(linkpsk->>'race_id')::int,
		(linkpsk->>'primary_skill_id')::int
	)
	RETURNING *;
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION link_primary_statistics_races(linkpst json) RETURNS "race_has_primary_statistic" AS $$
	INSERT INTO "race_has_primary_statistic"
	(race_id, primary_statistic_id)
		VALUES
	(
		(linkpst->>'race_id')::int,
		(linkpst->>'primary_statistic_id')::int
	)
	RETURNING *;
$$ LANGUAGE sql SECURITY DEFINER;

-- Characters en Many to Many :
CREATE OR REPLACE FUNCTION link_primary_skills_characters(linkpskch json) RETURNS "character_has_primary_skill" AS $$
	INSERT INTO "character_has_primary_skill"
	(character_id, primary_skill_id)
		VALUES
	(
		(linkpskch->>'character_id')::int,
		(linkpskch->>'primary_skill_id')::int
	)
	RETURNING *;
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION link_primary_statistics_characters(linkpstch json) RETURNS "character_has_primary_statistic" AS $$
	INSERT INTO "character_has_primary_statistic"
	(character_id, primary_statistic_id)
		VALUES
	(
		(linkpstch->>'character_id')::int,
		(linkpstch->>'primary_statistic_id')::int
	)
	RETURNING *;
$$ LANGUAGE sql SECURITY DEFINER;

COMMIT;