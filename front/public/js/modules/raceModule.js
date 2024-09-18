import utils from '../utils.js';
import api from '../api.js';

const raceModule = {

  listenToAddRaceButtonClick(){
    const addRaceButtonElement = document.querySelector('#addRaceButton');
    addRaceButtonElement.addEventListener('click', raceModule.openAddRaceModal);

    const closeElements = document.querySelectorAll('.button.close, .delete.close, .modal-background');

    for (const closeElement of closeElements){
      closeElement.addEventListener('click', utils.closeModals);
    }
  },

  listenToAddRaceFormSubmit(token){
    const addRaceFormElement = document.querySelector('#add-race-modal form');

    addRaceFormElement.addEventListener('submit', async (event) => {

      event.preventDefault();
      console.log('Soumission du formulaire');

      const addRaceForm = event.currentTarget;

      const addRaceFormData = new FormData(addRaceForm);
      const raceData = Object.fromEntries(addRaceFormData);

      if (raceData.primary_skill_id == "" && raceData.primary_statistic_id == "") {
        let newRaceData = raceData
        newRaceData = Object.keys(newRaceData).filter((objkey) => objkey !== 'label').reduce((newObj, key) => {
          newObj[key] = newRaceData[key];
          return newObj;
        },
        {});
        newRaceData = Object.keys(newRaceData).filter((objkey) => objkey !== 'skill').reduce((newObj, key) => {
          newObj[key] = newRaceData[key];
          return newObj;
        },
        {});
        newRaceData = Object.keys(newRaceData).filter((objkey) => objkey !== 'primary_skill_id').reduce((newObj, key) => {
          newObj[key] = newRaceData[key];
          return newObj;
        },
        {});
        newRaceData = Object.keys(newRaceData).filter((objkey) => objkey !== 'primary_statistic_id').reduce((newObj, key) => {
          newObj[key] = newRaceData[key];
          return newObj;
        },
        {});

        const data = Object.keys(newRaceData)
        let finalRaceData = newRaceData

        for (const element of data) {
          if (element.startsWith("primary_statistic_id")){
            finalRaceData = Object.keys(finalRaceData).filter((objkey) => objkey !== element).reduce((newObj, key) => {
              newObj[key] = finalRaceData[key];
              return newObj;
            },
            {});
          }

          if (element.startsWith("primary_skill_id")){
            newRaceData = Object.keys(newRaceData).filter((objkey) => objkey !== element).reduce((newObj, key) => {
              newObj[key] = newRaceData[key];
              return newObj;
            },
            {});
          }
        }

      
      const createdRace = await api.createRace(raceData, token);

      if (createdRace){

        const psks = await api.getPrimarySkills(token);
        const elements = Object.getOwnPropertyNames(finalRaceData);
        for (const littleElement of elements) {
          for (const psk of psks) {
            if (littleElement.includes(psk.label)) {
              let frdata = finalRaceData
              if (frdata = Object.keys(frdata).filter((objkey) => objkey == littleElement).reduce((newObj, key) => {
                newObj[key] = frdata[key];
                return newObj;
              },
              {})) {
                if (psk.value == Object.values(frdata)) {
                  const finalIdPsk = psk.id
                  const raceId = createdRace.id
                  const apiData = {race_id : raceId, primary_skill_id : finalIdPsk}
                  await api.linkRacePSK(apiData, token)
                }
              }
            }
          }
        }

        const psts = await api.getPrimaryStatistics(token);
        const elementss = Object.getOwnPropertyNames(newRaceData);
        for (const littleElement of elementss) {
          for (const pst of psts) {
            if (littleElement.includes(pst.label)) {
              let frdata = newRaceData
              if (frdata = Object.keys(frdata).filter((objkey) => objkey == littleElement).reduce((newObj, key) => {
                newObj[key] = frdata[key];
                return newObj;
              },
              {})) {
                if (pst.value == Object.values(frdata)) {
                  const finalIdPst = pst.id
                  const raceId = createdRace.id
                  const apiData = {race_id : raceId, primary_statistic_id : finalIdPst}
                  await api.linkRacePST(apiData, token)
                }
              }
            }
          }
        }
      }

        raceModule.addRaceToDom(createdRace);

        addRaceForm.reset();

        utils.closeModals();

      }
    });
  },


  listenToEditRaceFormSubmit(token){

    const editRaceFormElement = document.querySelector('#edit-race-modal form');

    editRaceFormElement.addEventListener('submit', async (event) => {

      event.preventDefault();

      const submittedEditRaceFormElement = event.currentTarget;

      const submittedEditRaceFormData = new FormData(submittedEditRaceFormElement);
      const raceData = Object.fromEntries(submittedEditRaceFormData);

      const updatedRace = await api.updateRace(raceData, token);

      if (updatedRace){
        const raceLabelElement = document.querySelector(`[slot="race-id"][data-id="${raceData.id}"] [slot="race-label"]`);
        raceLabelElement.textContent = updatedRace.label;

        const raceSkillElement = document.querySelector(`[slot="race-id"][data-id="${raceData.id}"] [slot="race-skill"]`);
        raceSkillElement.textContent = updatedRace.skill;

        submittedEditRaceFormElement.reset();

        utils.closeModals();
      }
    });
  },

  listenToDeleteRaceFormSubmit(token){
    const deleteRaceFormElement = document.querySelector('#delete-race-modal form');

    deleteRaceFormElement.addEventListener('submit', async (event) => {
      event.preventDefault();

      const deletedRaceForm = event.currentTarget;

      const deletedRaceFormData = new FormData(deletedRaceForm);

      const raceToDelete = Object.fromEntries(deletedRaceFormData);

      const raceId = raceToDelete.id;

      const isRaceDeleted = await api.deleteRace(raceId, token);

      if (isRaceDeleted){
        const raceToDeleteElement = document.querySelector(`[slot="race-id"][data-id="${raceId}"]`);
        raceToDeleteElement.remove();
        utils.closeModals();
      }

    });

  },

  async getRacesFromAPI(token){
    const races = await api.getRaces(token);

    if (races){
      for (const raceToAdd of races){
        raceModule.addRaceToDom(raceToAdd);
      }
    }
  },


  addRaceToDom(race){    

    const raceTemplate = document.querySelector("#race-template");
    const newRaceElement = raceTemplate.content.cloneNode(true);

    const newRaceLitleElement = newRaceElement.querySelector('[slot="race-label"]');
    newRaceLitleElement.textContent = race.label;

    const newRaceSkillElement = newRaceElement.querySelector('[slot="race-skill"]');
    newRaceSkillElement.textContent = race.skill;

    if (race.primary_skills) {
    const newRacePrimarySkillContainer = newRaceElement.querySelector('[slot="race-skills"]');
    const newRacePrimarySkillElement = newRaceElement.querySelector('[slot="race-primary-skill"]');
    for (const psk of race.primary_skills) {
      const clone = newRacePrimarySkillElement.cloneNode();
      clone.textContent = `${psk.label} : ${psk.value}`;
      newRacePrimarySkillContainer.append(clone);
    }
    }

    if (race.primary_statistics) {
    const newRacePrimaryStatisticContainer = newRaceElement.querySelector('[slot="race-stats"]');
    const newRacePrimaryStatisticElement = newRaceElement.querySelector('[slot="race-primary-statistic"]');
    for (const pst of race.primary_statistics) {
      const clone = newRacePrimaryStatisticElement.cloneNode();
      clone.textContent = `${pst.label} : ${pst.value}`;
      newRacePrimaryStatisticContainer.append(clone);
    }
    }

    const newRaceIdElement = newRaceElement.querySelector('[slot="race-id"]');
    newRaceIdElement.dataset.id = race.id;

    const raceContainerElement = document.querySelector('#races-container');
    raceContainerElement.append(newRaceElement);

    const editElement = newRaceLitleElement.nextElementSibling;
    editElement.addEventListener('click', raceModule.openEditRaceModal);

    const deletedRaceButtonElement = newRaceIdElement.querySelector('.has-text-danger');

    deletedRaceButtonElement.addEventListener('click', raceModule.openDeleteRaceModal);

  },

  openAddRaceModal(){
    const addRaceModalElement = document.querySelector('#add-race-modal');
    addRaceModalElement.classList.add('is-active');

  },


  async getPrimarySkillsFromAPI(token){

    const psks = await api.getPrimarySkills(token);

    const pskBigContainer = document.querySelector('#psk-big-container');

    for (const psk of psks) {
      if (psk.value == 1) {
        const bigClone = pskBigContainer.cloneNode();
        bigClone.textContent = psk.label
        bigClone.hidden = false;
        const pskc = document.querySelector('#psk');
        pskc.append(bigClone);
        const select = document.querySelector('#primary_skill_id');
        const selectClone = select.cloneNode();
        selectClone.hidden = false;
        bigClone.append(selectClone);
        const pskContainer = document.querySelector('.psk-container');
        for (const allpsk of psks) {
          if (allpsk.label == psk.label) {
            selectClone.name = `primary_skill_id_${allpsk.label}`;
            const clone = pskContainer.cloneNode();
            clone.textContent = allpsk.value
            clone.value = allpsk.value
            clone.id = allpsk.id
            clone.hidden = false;
            selectClone.append(clone)
          }
        }
      }
    }
  },

  async getPrimaryStatisticsFromAPI(token){

    const psts = await api.getPrimaryStatistics(token);

    const pstBigContainer = document.querySelector('#pst-big-container');

    for (const pst of psts) {
      if (pst.value == 1) {
        const bigClone = pstBigContainer.cloneNode();
        bigClone.textContent = pst.label
        bigClone.hidden = false;
        const pstc = document.querySelector('#pst');
        pstc.append(bigClone);
        const select = document.querySelector('#primary_statistic_id');
        const selectClone = select.cloneNode();
        selectClone.hidden = false;
        bigClone.append(selectClone);
        const pstContainer = document.querySelector('.pst-container');
        for (const allpst of psts) {
          if (allpst.label == pst.label) {
            selectClone.name = `primary_statistic_id_${allpst.label}`;
            const clone = pstContainer.cloneNode();
            clone.textContent = allpst.value
            clone.value = allpst.value
            clone.hidden = false;
            selectClone.append(clone)
          }
        }
      }
    } 
  },

  openEditRaceModal(event){

    const clickedDiv = event.currentTarget;

    const raceElement = clickedDiv.closest('[slot="race-id"');

    const raceId = raceElement.dataset.id;

    const editModalElement = document.querySelector('#edit-race-modal');
    editModalElement.classList.add('is-active');

    const inputHiddenIdElement = editModalElement.querySelector('[name="id"]');
    inputHiddenIdElement.value = raceId;

    const inputLabelContentElement = editModalElement.querySelector('[name="label"]');
    inputLabelContentElement.value = clickedDiv.previousSibling.previousSibling.textContent;

    const inputSkillContentElement = editModalElement.querySelector('[name="skill"]');
    const raceSkill = clickedDiv.parentNode.nextElementSibling.lastChild.previousSibling;
    inputSkillContentElement.value = raceSkill.textContent.trim();
  },

  openDeleteRaceModal(event){
    const clickedButton = event.currentTarget;
    const raceElement = clickedButton.closest('.race');

    const raceId = raceElement.dataset.id;
    const raceLabel = raceElement.querySelector('[slot="race-label"]').textContent;

    const deletedRaceModalElement = document.querySelector('#delete-race-modal');
    deletedRaceModalElement.classList.add('is-active');

    const inputHiddenIdElement = deletedRaceModalElement.querySelector('[name="id"]');
    inputHiddenIdElement.value = raceId;

    const contentSlotElement = deletedRaceModalElement.querySelector('[slot="race-label"]');
    contentSlotElement.textContent = raceLabel;

  },

};

export default raceModule;