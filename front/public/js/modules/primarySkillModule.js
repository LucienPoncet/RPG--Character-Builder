import utils from '../utils.js';
import api from '../api.js';

const primarySkillModule = {

  listenToAddPrimarySkillButtonClick(){
    const addPrimarySkillButtonElement = document.querySelector('#addPrimarySkillButton');
    addPrimarySkillButtonElement.addEventListener('click', primarySkillModule.openAddPrimarySkillModal);

    const closeElements = document.querySelectorAll('.button.close, .delete.close, .modal-background');

    for (const closeElement of closeElements){
      closeElement.addEventListener('click', utils.closeModals);
    }
  },

  listenToAddPrimarySkillFormSubmit(token){
    const addPrimarySkillFormElement = document.querySelector('#add-primary-skill-modal form');

    addPrimarySkillFormElement.addEventListener('submit', async (event) => {

      event.preventDefault();
      console.log('Soumission du formulaire');

      const addPrimarySkillForm = event.currentTarget;

      const addPrimarySkillFormData = new FormData(addPrimarySkillForm);
      const primarySkillData = Object.fromEntries(addPrimarySkillFormData);

      primarySkillData.value = Number(primarySkillData.value);

      const values = primarySkillData.value;

      for (let newValues=1; newValues <= values; newValues++) {
        primarySkillData.value = newValues;

        const createdPrimarySkill = await api.createPrimarySkill(primarySkillData, token);

        primarySkillModule.addPrimarySkillToDom(createdPrimarySkill, token);
  
        addPrimarySkillForm.reset();
    
        utils.closeModals();
      }

    });
  },


  listenToEditPrimarySkillFormSubmit(token){

    const editPrimarySkillFormElement = document.querySelector('#edit-primary-skill-modal form');

    editPrimarySkillFormElement.addEventListener('submit', async (event) => {

      event.preventDefault();

      const submittedEditPrimarySkillFormElement = event.currentTarget;

      const submittedEditPrimarySkillFormData = new FormData(submittedEditPrimarySkillFormElement);
      const primarySkillData = Object.fromEntries(submittedEditPrimarySkillFormData);

      const primarySkills = await api.getPrimarySkills(token);
      for (const primarySkill of primarySkills) {
        if (primarySkill.id == primarySkillData.id) {
          const label = primarySkill.label;
          const newPrimarySkills = await api.getPrimarySkills(token);
          for (const newPrimarySkill of newPrimarySkills) {
            if (newPrimarySkill.label == label) {
              newPrimarySkill.label = primarySkillData.label;
              await api.updatePrimarySkill(newPrimarySkill, token);
            }
          }
        }
      }

      const primarySkillLabelElement = document.querySelector(`[slot="primary-skill-id"][data-id="${primarySkillData.id}"] [slot="primary-skill-label"]`);
      primarySkillLabelElement.textContent = primarySkillData.label;

      submittedEditPrimarySkillFormElement.reset();

      utils.closeModals();
    });
  },

  listenToDeletePrimarySkillFormSubmit(token){
    const deletePrimarySkillFormElement = document.querySelector('#delete-primary-skill-modal form');

    deletePrimarySkillFormElement.addEventListener('submit', async (event) => {
      event.preventDefault();

      const deletedPrimarySkillForm = event.currentTarget;

      const deletedPrimarySkillFormData = new FormData(deletedPrimarySkillForm);

      const primarySkillToDelete = Object.fromEntries(deletedPrimarySkillFormData);

      const primarySkillId = primarySkillToDelete.id;

      const isPrimarySkillDeleted = await api.deletePrimarySkill(primarySkillId, token);

      if (isPrimarySkillDeleted){
        const primarySkillToDeleteElement = document.querySelector(`[slot="primary-skill-id"][data-id="${primarySkillId}"]`);

        const primarySkills = await api.getPrimarySkills(token); 
        for (const newPrimarySkill of primarySkills) {
          if (newPrimarySkill.label == primarySkillToDeleteElement.firstChild.nextSibling.textContent.trim()) {
            await api.deletePrimarySkill(newPrimarySkill.id, token)
          }
        }

        primarySkillToDeleteElement.remove();
        utils.closeModals();
      }

    });

  },

  async getPrimarySkillsFromAPI(token){
    const primarySkills = await api.getPrimarySkills(token); 

    if (primarySkills){
      for (const primarySkillToAdd of primarySkills){
          primarySkillModule.addPrimarySkillToDom(primarySkillToAdd, token);
        }
    }
  },


  async addPrimarySkillToDom(primarySkill, token){
    if (primarySkill.value == 1) {
    const primarySkillTemplate = document.querySelector("#primary-skill-template");
    const newPrimarySkillElement = primarySkillTemplate.content.cloneNode(true);

    const newPrimarySkillLabelElement = newPrimarySkillElement.querySelector('[slot="primary-skill-label"]');
    newPrimarySkillLabelElement.textContent = primarySkill.label;

    const primarySkills = await api.getPrimarySkills(token);
    for (const newPrimarySkill of primarySkills) {
      if (newPrimarySkill.label == primarySkill.label) {
        for (let values=1; values <= newPrimarySkill.value; values++) {
          if (values == newPrimarySkill.value && values != 1) {
            const newPrimarySkillValueElement = newPrimarySkillElement.querySelector('[slot="primary-skill-value"]');
            newPrimarySkillValueElement.textContent = values;
          } else if (values == 1) {
            const newPrimarySkillValueElement = newPrimarySkillElement.querySelector('[slot="primary-skill-value"]');
            newPrimarySkillValueElement.textContent = "---";
          }
        }
      }
    }

    const newPrimarySkillIdElement = newPrimarySkillElement.querySelector('[slot="primary-skill-id"]');
    newPrimarySkillIdElement.dataset.id = primarySkill.id;

    const primarySkillContainerElement = document.querySelector('#primary-skills-container');
    primarySkillContainerElement.append(newPrimarySkillElement);

    const editElement = newPrimarySkillLabelElement.nextElementSibling;
    editElement.addEventListener('click', primarySkillModule.openEditPrimarySkillModal);

    const deletedPrimarySkillButtonElement = newPrimarySkillIdElement.querySelector('.has-text-danger');

    deletedPrimarySkillButtonElement.addEventListener('click', primarySkillModule.openDeletePrimarySkillModal);

    const response = await api.getUser(token);
    if (response.role == "member") {
      const noneElements = document.querySelectorAll('.none');
      for (const noneElement of noneElements) {
        noneElement.classList.add('hidden')
      }   
    }
  }
  },

  openAddPrimarySkillModal(){
    const addPrimarySkillModalElement = document.querySelector('#add-primary-skill-modal');
    addPrimarySkillModalElement.classList.add('is-active');

  },

  openEditPrimarySkillModal(event){

    const clickedDiv = event.currentTarget;

    const primarySkillElement = clickedDiv.closest('[slot="primary-skill-id"');

    const primarySkillId = primarySkillElement.dataset.id;

    const editModalElement = document.querySelector('#edit-primary-skill-modal');
    editModalElement.classList.add('is-active');

    const inputHiddenIdElement = editModalElement.querySelector('[name="id"]');
    inputHiddenIdElement.value = primarySkillId;

    const inputLabelContentElement = editModalElement.querySelector('[name="label"]');
    inputLabelContentElement.value = clickedDiv.previousSibling.previousSibling.textContent;
    
  },

  openDeletePrimarySkillModal(event){
    const clickedButton = event.currentTarget;
    const primarySkillElement = clickedButton.closest('.primary-skill');

    const primarySkillId = primarySkillElement.dataset.id;
    const primarySkillLabel = primarySkillElement.querySelector('[slot="primary-skill-label"]').textContent;

    const deletedPrimarySkillModalElement = document.querySelector('#delete-primary-skill-modal');
    deletedPrimarySkillModalElement.classList.add('is-active');

    const inputHiddenIdElement = deletedPrimarySkillModalElement.querySelector('[name="id"]');
    inputHiddenIdElement.value = primarySkillId;

    const contentSlotLabelElement = deletedPrimarySkillModalElement.querySelector('[slot="primary-skill-label"]');
    contentSlotLabelElement.textContent = primarySkillLabel;

  },

};

export default primarySkillModule;