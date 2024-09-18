# MLD

```txt
user(<u>user_id</u>, email, password, lastname, firstname, role)
character(<u>character_id</u>, lastname, firstname, level, #user_id, #class_id, #level_id, #race_id)
specialization(<u>specialization_id</u>, label, #class_id)
magic(<u>magic_id</u>, label)
class(<u>class_id</u>, label, #magic_id)
race(<u>race_id</u>, label, skill)
primary_skill(<u>primary_skill_id</u>, label)
race_has_primary_statistic(#race_id, #primary_statistic_id)
race_has_primary_skill(#race_id, #primary_skill_id)
```
