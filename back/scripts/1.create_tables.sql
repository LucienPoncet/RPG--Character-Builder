BEGIN;

DROP TABLE IF EXISTS "user", "magic", "class", "race", "specialization", "primary_skill", "primary_statistic", "character", "race_has_primary_statistic", "race_has_primary_skill", "character_has_primary_statistic", "character_has_primary_skill";

CREATE DOMAIN domain_password AS TEXT
CHECK(
   VALUE ~ '^[a-zA-Z0-9!?*_%]{6,20}$' 
);

CREATE DOMAIN domain_mail AS TEXT
CHECK(
   VALUE ~ '^([-!#-''*+/-9=?A-Z^-~]+(\.[-!#-''*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)*|\[((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|IPv6:((((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){6}|::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){5}|[0-9A-Fa-f]{0,4}::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){4}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):)?(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){3}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,2}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){2}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,3}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,4}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::)((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3})|(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3})|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,5}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3})|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,6}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::)|(?!IPv6:)[0-9A-Za-z-]*[0-9A-Za-z]:[!-Z^-~]+)])$' 
);

CREATE TYPE public.enum_role AS ENUM
    ('member', 'admin');

CREATE TABLE "user" (
  "id"         INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "email"      domain_mail NOT NULL UNIQUE,
  "password"   domain_password NOT NULL,
  "lastname"   TEXT,
  "firstname"  TEXT,
  "role"       enum_role NOT NULL DEFAULT 'member',
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "magic" (
  "id"          INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "label"       TEXT NOT NULL,
  "created_at"  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at"  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "class" (
  "id"          INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "label"       TEXT NOT NULL,
  "magic_id"    INTEGER REFERENCES "magic"("id"),
  "created_at"  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at"  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "race" (
  "id"          INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "label"       TEXT NOT NULL,
  "skill"       TEXT NOT NULL,
  "created_at"  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at"  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "specialization" (
  "id"          INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "label"       TEXT NOT NULL,
  "class_id"    INTEGER NOT NULL REFERENCES "class"("id") ON DELETE CASCADE,
  "created_at"  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at"  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "primary_skill" (
  "id"          INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "label"       TEXT NOT NULL,
  "value"       INTEGER NOT NULL DEFAULT 1,
  "created_at"  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at"  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "primary_statistic" (
  "id"          INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "label"       TEXT NOT NULL,
  "value"       INTEGER NOT NULL DEFAULT 1,
  "created_at"  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at"  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "character" (
  "id"         INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "lastname"   TEXT,
  "firstname"  TEXT,
  "level"      INTEGER NOT NULL DEFAULT 1,
  "user_id"    INTEGER NOT NULL REFERENCES "user"("id"),
  "class_id"   INTEGER NOT NULL REFERENCES "class"("id"),
  "race_id"    INTEGER NOT NULL REFERENCES "race"("id"),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "race_has_primary_statistic"(
  "race_id" INTEGER NOT NULL REFERENCES "race"("id") ON DELETE CASCADE,
  "primary_statistic_id" INTEGER NOT NULL REFERENCES "primary_statistic"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("race_id", "primary_statistic_id")
);

CREATE TABLE "race_has_primary_skill"(
  "race_id" INTEGER NOT NULL REFERENCES "race"("id") ON DELETE CASCADE,
  "primary_skill_id" INTEGER NOT NULL REFERENCES "primary_skill"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("race_id", "primary_skill_id")
);

CREATE TABLE "character_has_primary_statistic"(
  "character_id" INTEGER NOT NULL REFERENCES "character"("id") ON DELETE CASCADE,
  "primary_statistic_id" INTEGER NOT NULL REFERENCES "primary_statistic"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("character_id", "primary_statistic_id")
);

CREATE TABLE "character_has_primary_skill"(
  "character_id" INTEGER NOT NULL REFERENCES "character"("id") ON DELETE CASCADE,
  "primary_skill_id" INTEGER NOT NULL REFERENCES "primary_skill"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("character_id", "primary_skill_id")
);

COMMIT;