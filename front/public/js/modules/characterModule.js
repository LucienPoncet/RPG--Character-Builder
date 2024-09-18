import utils from '../utils.js';
import api from '../api.js';

const characterModule = {

    listenToAddCharacterButtonClick(){
        const addCharacterButtonElement = document.querySelector('#addCharacterButton');
        addCharacterButtonElement.addEventListener('click', characterModule.openAddCharacterModal);
    
        const closeElements = document.querySelectorAll('.button.close, .delete.close, .modal-background');
    
        for (const closeElement of closeElements){
          closeElement.addEventListener('click', utils.closeModals);
        }
      },
    
      listenToAddCharacterFormSubmit(token){
        const addCharacterFormElement = document.querySelector('#add-character-modal form');
    
        addCharacterFormElement.addEventListener('submit', async (event) => {
    
          event.preventDefault();
          console.log('Soumission du formulaire');
    
          const addCharacterForm = event.currentTarget;
    
          const addCharacterFormData = new FormData(addCharacterForm);
          const characterData = Object.fromEntries(addCharacterFormData);

          const response = await api.getUser(token);
          Object.assign(characterData, { user_id: response.id })
    
          const createdCharacter = await api.createCharacter(characterData, token);
    
          if (createdCharacter){
            characterModule.addCharacterToDom(createdCharacter, token);
    
            addCharacterForm.reset();
    
            utils.closeModals();
    
          }
        });
      },
    
    
      listenToEditCharacterFormSubmit(token){
    
        const editCharacterFormElement = document.querySelector('#edit-character-modal form');
    
        editCharacterFormElement.addEventListener('submit', async (event) => {
    
          event.preventDefault();
    
          const submittedEditCharacterFormElement = event.currentTarget;
    
          const submittedEditCharacterFormData = new FormData(submittedEditCharacterFormElement);
          const characterData = Object.fromEntries(submittedEditCharacterFormData);
    
          const updatedCharacter = await api.updateCharacter(characterData, token);
    
          if (updatedCharacter){
    
            const characterLastnameElement = document.querySelector(`[slot="character-id"][data-id="${characterData.id}"] [slot="character-lastname"]`);
            characterLastnameElement.textContent = updatedCharacter.lastname;

            const characterFirstnameElement = document.querySelector(`[slot="character-id"][data-id="${characterData.id}"] [slot="character-firstname"]`);
            characterFirstnameElement.textContent = updatedCharacter.firstname;

            const characterLevelElement = document.querySelector(`[slot="character-id"][data-id="${characterData.id}"] [slot="character-level"]`);
            characterLevelElement.textContent = updatedCharacter.level;
    
            const characterClassElement = document.querySelector(`[slot="character-id"][data-id="${characterData.id}"] [slot="character-class"]`);
            characterClassElement.textContent = `Classe du personnage en cours d'évolution`;

            const characterMagicElement = document.querySelector(`[slot="character-id"][data-id="${characterData.id}"] [slot="character-magic"]`);
            characterMagicElement.textContent = `Magie du personnage en cours d'évolution`;

            const characterRaceElement = document.querySelector(`[slot="character-id"][data-id="${characterData.id}"] [slot="character-race"]`);
            characterRaceElement.textContent = `Race du personnage en cours d'évolution`;

            const characterPSKElement = document.querySelector(`[slot="character-id"][data-id="${characterData.id}"] [slot="character-primary-skills"]`);
            characterPSKElement.textContent = `Compétences Primaires du personnage en cours d'évolution`;

            const characterPSTElement = document.querySelector(`[slot="character-id"][data-id="${characterData.id}"] [slot="character-primary-statistics"]`);
            characterPSTElement.textContent = `Statistiques Primaires du personnage en cours d'évolution`;
    
            submittedEditCharacterFormElement.reset();
    
            utils.closeModals();
          }
        });
      },
    
      listenToDeleteCharacterFormSubmit(token){
        const deleteCharacterFormElement = document.querySelector('#delete-character-modal form');
    
        deleteCharacterFormElement.addEventListener('submit', async (event) => {
          event.preventDefault();
    
          const deletedCharacterForm = event.currentTarget;
    
          const deletedCharacterFormData = new FormData(deletedCharacterForm);
    
          const characterToDelete = Object.fromEntries(deletedCharacterFormData);
    
          const characterId = characterToDelete.id;
    
          const isCharacterDeleted = await api.deleteCharacter(characterId, token);
    
          if (isCharacterDeleted){
            const characterToDeleteElement = document.querySelector(`[slot="character-id"][data-id="${characterId}"]`);
            characterToDeleteElement.remove();
            utils.closeModals();
          }
    
        });
    
      },
    
    
      async getCharactersFromAPI(token, req, res){
        const characters = await api.getCharacters(token);
    
        if (characters){
          for (const characterToAdd of characters){
            characterModule.addCharacterToDom(characterToAdd, token);
          }
        }
      },

    
      addCharacterToDom(characterToAdd, token){
    
        const characterTemplate = document.querySelector("#character-template");
        const newCharacterElement = characterTemplate.content.cloneNode(true);
    
        const newCharacterFirstnameElement = newCharacterElement.querySelector('[slot="character-firstname"]');
        newCharacterFirstnameElement.textContent = characterToAdd.firstname;

        const newCharacterLastnameElement = newCharacterElement.querySelector('[slot="character-lastname"]');
        newCharacterLastnameElement.textContent = characterToAdd.lastname;

        const newCharacterLevelElement = newCharacterElement.querySelector('[slot="character-level"]');
        newCharacterLevelElement.textContent = characterToAdd.level;
    
        const newCharacterIdElement = newCharacterElement.querySelector('[slot="character-id"]');
        newCharacterIdElement.dataset.id= characterToAdd.id;
    
        const characterContainerElement = document.querySelector('#characters-container');
        characterContainerElement.append(newCharacterElement);
    
        const editElement = newCharacterLevelElement.nextElementSibling;
        editElement.addEventListener('click', characterModule.openEditCharacterModal);
    
        const deletedCharacterButtonElement = newCharacterIdElement.querySelector('.has-text-danger');
    
        deletedCharacterButtonElement.addEventListener('click', characterModule.openDeleteCharacterModal);
    
        if (characterToAdd.class_id) {
          characterModule.putClass(characterToAdd, token)
        }

        if (characterToAdd.race_id) {
          characterModule.putRace(characterToAdd, token)
        }
    
      },
    
      openAddCharacterModal(){
        const addCharacterModalElement = document.querySelector('#add-character-modal');
        addCharacterModalElement.classList.add('is-active');
      },
    
      async putClass(characterToAdd, token){
        const classes = await api.getClasses(token);
        for (const characterClass of classes) {
          if (characterClass.id === characterToAdd.class_id) {
            const newCharactersElements = document.querySelectorAll('[slot="character-id"]');
            for (const newCharacterElement of newCharactersElements) {
              if (newCharacterElement.dataset.id == characterToAdd.id) {
                const newClassElement = newCharacterElement.lastChild.previousSibling.firstChild.nextSibling;
                newClassElement.append(`CLASSE : ${characterClass.label} `);
                const specializations = await api.getSpecializations(token);
                for (const specialization of specializations) {
                  if (characterClass.id == specialization.class_id) {
                    newClassElement.append(` (${specialization.label})`);
                  }
                }
                
                if (characterClass.magic_id) {
                  const magics = await api.getMagics(token);
                  for (const magic of magics) {
                    if (characterClass.magic_id == magic.id) {
                      const newMagicElement = newClassElement.nextSibling.nextSibling;
                      newMagicElement.append(`MAGIE : ${magic.label}`);
                    }
                  }
                }
              }
            }
          }
        }
      },

      async putRace(characterToAdd, token){
        const races = await api.getRaces(token);
        for (const race of races) {
          if (race.id === characterToAdd.race_id) {
            const newCharactersElements = document.querySelectorAll('[slot="character-id"]');
            for (const newCharacterElement of newCharactersElements) {
              if (newCharacterElement.dataset.id == characterToAdd.id) {
                const newRaceElement = newCharacterElement.lastChild.previousSibling.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling;
                newRaceElement.append(`RACE : ${race.label} `);
                
                if (race.primary_skills) {
                  const newPSKElement = newRaceElement.nextSibling.nextSibling.nextSibling.nextSibling;
                  newPSKElement.append('COMPETENCES PRIMAIRES = ');
                  for (const primary_skill of race.primary_skills) {
                    newPSKElement.append(`${primary_skill.label}:${primary_skill.value} `);
                  }
                }
                
                if (race.primary_statistics) {
                  const newPSTElement = newRaceElement.nextSibling.nextSibling;
                  newPSTElement.append('STATISTIQUES PRIMAIRES = ');
                  for (const primary_statistic of race.primary_statistics) {
                    newPSTElement.append(`${primary_statistic.label}:${primary_statistic.value} `);
                  }
                }
              }
            }
          }
        }
      },

      async getClassesFromAPI(token){

        const classes = await api.getClasses(token);
    
        const classesContainer = document.querySelectorAll('.class-character-container');
    
        for (const characterClass of classes) {
          for (const classContainer of classesContainer) {
            const clone = classContainer.cloneNode();
            clone.value = characterClass.id;
            const select = document.querySelector('#class_id');
            select.append(clone);
            if (clone.value == characterClass.id) {
              clone.hidden = false;
              clone.textContent = characterClass.label;
            }
          }
        }
      },
    
      async editClassesFromAPI(token){
    
        const classes = await api.getClasses(token);
    
        const classesContainer = document.querySelectorAll('.new-class-container');
    
        for (const characterClass of classes) {
          for (const classContainer of classesContainer) {
            const clone = classContainer.cloneNode();
            clone.value = characterClass.id;
            const select = document.querySelector('#edit_class_id');
            select.append(clone);
            if (clone.value == characterClass.id) {
              clone.hidden = false;
              clone.textContent = characterClass.label;
            }
          }
        }
      },

      async getRacesFromAPI(token){

        const races = await api.getRaces(token);
    
        const racesContainer = document.querySelectorAll('.race-character-container');
    
        for (const race of races) {
          for (const raceContainer of racesContainer) {
            const clone = raceContainer.cloneNode();
            clone.value = race.id;
            const select = document.querySelector('#race_id');
            select.append(clone);
            if (clone.value == race.id) {
              clone.hidden = false;
              clone.textContent = race.label;
            }
          }
        }
      },
    
      async editRacesFromAPI(token){
    
        const races = await api.getRaces(token);
    
        const racesContainer = document.querySelectorAll('.new-race-container');
    
        for (const race of races) {
          for (const raceContainer of racesContainer) {
            const clone = raceContainer.cloneNode();
            clone.value = race.id;
            const select = document.querySelector('#edit_race_id');
            select.append(clone);
            if (clone.value == race.id) {
              clone.hidden = false;
              clone.textContent = race.label;
            }
          }
        }
      },
    
      openEditCharacterModal(event){
    
        const clickedDiv = event.currentTarget;
    
        const characterElement = clickedDiv.closest('[slot="character-id"');
    
        const characterId = characterElement.dataset.id;
    
        const editModalElement = document.querySelector('#edit-character-modal');
        editModalElement.classList.add('is-active');
    
        const inputHiddenIdElement = editModalElement.querySelector('[name="id"]');
        inputHiddenIdElement.value = characterId;
    
        const inputLevelContentElement = editModalElement.querySelector('[name="level"]');
        inputLevelContentElement.value = clickedDiv.previousSibling.previousSibling.textContent;

        console.log(clickedDiv.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling)

        const inputFirstnameContentElement = editModalElement.querySelector('[name="firstname"]');
        inputFirstnameContentElement.value = clickedDiv.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.textContent;

        const inputLastnameContentElement = editModalElement.querySelector('[name="lastname"]');
        inputLastnameContentElement.value = clickedDiv.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.textContent;
    
        const inputClassContentElement = editModalElement.querySelector('.class-label');
        const characterClass = clickedDiv.parentNode.nextElementSibling.firstChild.nextElementSibling.textContent;
        inputClassContentElement.textContent = characterClass;

        const inputRaceContentElement = editModalElement.querySelector('.race-label');
        const characterRace = clickedDiv.parentNode.nextElementSibling.firstChild.nextElementSibling.nextElementSibling.nextElementSibling.textContent;
        inputRaceContentElement.textContent = characterRace;
    
      },
    
      openDeleteCharacterModal(event){
        const clickedButton = event.currentTarget;
        const characterElement = clickedButton.closest('.character');
    
        const characterId = characterElement.dataset.id;
        const characterLastname = characterElement.querySelector('[slot="character-lastname"]').textContent;
        const characterFirstname = characterElement.querySelector('[slot="character-firstname"]').textContent;
    
        const deletedCharacterModalElement = document.querySelector('#delete-character-modal');
        deletedCharacterModalElement.classList.add('is-active');
    
        const inputHiddenIdElement = deletedCharacterModalElement.querySelector('[name="id"]');
        inputHiddenIdElement.value = characterId;
    
        const contentSlotLastnameElement = deletedCharacterModalElement.querySelector('[slot="character-lastname"]');
        contentSlotLastnameElement.textContent = characterLastname;

        const contentSlotFirstnameElement = deletedCharacterModalElement.querySelector('[slot="character-lastname"]');
        contentSlotFirstnameElement.textContent = characterFirstname;
    
      },

};

export default characterModule;