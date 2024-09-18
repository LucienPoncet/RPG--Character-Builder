# MCD

## 1 - Les entités

- personnage
- statistique primaire
- compétence primaire
- magie
- classe
- spécialisation
- race
- utilisateur

## 2 - Attributs des entités

- personnage
  - code personnage
  - nom
  - prénom
  - niveau
- statistique primaire
  - code statistique primaire
  - libellé
  - valeur
- compétence primaire
  - code compétence primaire
  - libellé
  - valeur
- magie
  - code magie
  - libellé
- classe
  - code classe
  - libellé
- spécialisation
  - code spécialisation
  - libellé
- race
  - code race
  - libellé
  - compétence de race
- utilisateur
  - code utilisateur
  - nom
  - prénom
  - email
  - mot de passe
  - role

### Version finale (format MoCoDo)

```txt
créer, 0N utilisateur, 11 personnage
personnage: code personnage, nom, prénom, niveau
magie: code magie, libellé
pratiquer, 01 classe, 0N magie

utilisateur: code utilisateur, nom, prénom, email, mot de passe, role
avoir1, 11 personnage, 0N race
avoir2, 11 personnage, 0N classe
classe: code classe, libellé
:

possèder1, 1N race, 1N statistique primaire
race: code race, libellé, compétence de race
possèder2, 1N race, 1N compétence primaire
contenir, 1N classe, 11 spécialisation
:

statistique primaire: code statistique primaire, libellé, valeur
:
compétence primaire: code compétence primaire, libellé, valeur
spécialisation: code spécialisation, libellé
:
```
