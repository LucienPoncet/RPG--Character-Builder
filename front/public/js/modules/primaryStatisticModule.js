import utils from '../utils.js';
import api from '../api.js';

const primaryStatisticModule = {

  listenToAddPrimaryStatisticButtonClick(){
    const addPrimaryStatisticButtonElement = document.querySelector('#addPrimaryStatisticButton');
    addPrimaryStatisticButtonElement.addEventListener('click', primaryStatisticModule.openAddPrimaryStatisticModal);

    const closeElements = document.querySelectorAll('.button.close, .delete.close, .modal-background');

    for (const closeElement of closeElements){
      closeElement.addEventListener('click', utils.closeModals);
    }
  },

  listenToAddPrimaryStatisticFormSubmit(token){
    const addPrimaryStatisticFormElement = document.querySelector('#add-primary-statistic-modal form');

    addPrimaryStatisticFormElement.addEventListener('submit', async (event) => {

      event.preventDefault();
      console.log('Soumission du formulaire');

      const addPrimaryStatisticForm = event.currentTarget;

      const addPrimaryStatisticFormData = new FormData(addPrimaryStatisticForm);
      const primaryStatisticData = Object.fromEntries(addPrimaryStatisticFormData);

      primaryStatisticData.value = Number(primaryStatisticData.value);

      const values = primaryStatisticData.value;

      for (let newValues=1; newValues <= values; newValues++) {
        primaryStatisticData.value = newValues;

        const createdPrimaryStatistic = await api.createPrimaryStatistic(primaryStatisticData, token);

        primaryStatisticModule.addPrimaryStatisticToDom(createdPrimaryStatistic, token);
  
        addPrimaryStatisticForm.reset();
    
        utils.closeModals();
      }

    });
  },


  listenToEditPrimaryStatisticFormSubmit(token){

    const editPrimaryStatisticFormElement = document.querySelector('#edit-primary-statistic-modal form');

    editPrimaryStatisticFormElement.addEventListener('submit', async (event) => {

      event.preventDefault();

      const submittedEditPrimaryStatisticFormElement = event.currentTarget;

      const submittedEditPrimaryStatisticFormData = new FormData(submittedEditPrimaryStatisticFormElement);
      const primaryStatisticData = Object.fromEntries(submittedEditPrimaryStatisticFormData);

      const primaryStatistics = await api.getPrimaryStatistics(token);
      for (const primaryStatistic of primaryStatistics) {
        if (primaryStatistic.id == primaryStatisticData.id) {
          const label = primaryStatistic.label;
          const newPrimaryStatistics = await api.getPrimaryStatistics(token);
          for (const newPrimaryStatistic of newPrimaryStatistics) {
            if (newPrimaryStatistic.label == label) {
              newPrimaryStatistic.label = primaryStatisticData.label;
              await api.updatePrimaryStatistic(newPrimaryStatistic, token);
            }
          }
        }
      }
      
      const primaryStatisticLabelElement = document.querySelector(`[slot="primary-statistic-id"][data-id="${primaryStatisticData.id}"] [slot="primary-statistic-label"]`);
      primaryStatisticLabelElement.textContent = primaryStatisticData.label;

      submittedEditPrimaryStatisticFormElement.reset();

      utils.closeModals();
    });
  },

  listenToDeletePrimaryStatisticFormSubmit(token){
    const deletePrimaryStatisticFormElement = document.querySelector('#delete-primary-statistic-modal form');

    deletePrimaryStatisticFormElement.addEventListener('submit', async (event) => {
      event.preventDefault();

      const deletedPrimaryStatisticForm = event.currentTarget;

      const deletedPrimaryStatisticFormData = new FormData(deletedPrimaryStatisticForm);

      const primaryStatisticToDelete = Object.fromEntries(deletedPrimaryStatisticFormData);

      const primaryStatisticId = primaryStatisticToDelete.id;

      const isPrimaryStatisticDeleted = await api.deletePrimaryStatistic(primaryStatisticId, token);

      if (isPrimaryStatisticDeleted){
        const primaryStatisticToDeleteElement = document.querySelector(`[slot="primary-statistic-id"][data-id="${primaryStatisticId}"]`);

        const primaryStatistics = await api.getPrimaryStatistics(token); 
        for (const newPrimaryStatistic of primaryStatistics) {
          if (newPrimaryStatistic.label == primaryStatisticToDeleteElement.firstChild.nextSibling.textContent.trim()) {
            await api.deletePrimaryStatistic(newPrimaryStatistic.id, token)
          }
        }

        primaryStatisticToDeleteElement.remove();
        utils.closeModals();
      }

    });

  },

  async getPrimaryStatisticsFromAPI(token){
    const primaryStatistics = await api.getPrimaryStatistics(token);

    if (primaryStatistics){
      for (const primaryStatisticToAdd of primaryStatistics){
        primaryStatisticModule.addPrimaryStatisticToDom(primaryStatisticToAdd, token);
      }
    }
  },


  async addPrimaryStatisticToDom(primaryStatistic, token){
    if (primaryStatistic.value == 1) {
    const primaryStatisticTemplate = document.querySelector("#primary-statistic-template");
    const newPrimaryStatisticElement = primaryStatisticTemplate.content.cloneNode(true);

    const newPrimaryStatisticLabelElement = newPrimaryStatisticElement.querySelector('[slot="primary-statistic-label"]');
    newPrimaryStatisticLabelElement.textContent = primaryStatistic.label;

    const primaryStatistics = await api.getPrimaryStatistics(token);
    for (const newPrimaryStatistic of primaryStatistics) {
      if (newPrimaryStatistic.label == primaryStatistic.label) {
        for (let values=1; values <= newPrimaryStatistic.value; values++) {
          if (values == newPrimaryStatistic.value && values != 1) {
            const newPrimaryStatisticValueElement = newPrimaryStatisticElement.querySelector('[slot="primary-statistic-value"]');
            newPrimaryStatisticValueElement.textContent = values;
          } else if (values == 1) {
            const newPrimaryStatisticValueElement = newPrimaryStatisticElement.querySelector('[slot="primary-statistic-value"]');
            newPrimaryStatisticValueElement.textContent = "---";
          }
        }
      }
    }

    const newPrimaryStatisticIdElement = newPrimaryStatisticElement.querySelector('[slot="primary-statistic-id"]');
    newPrimaryStatisticIdElement.dataset.id = primaryStatistic.id;

    const primaryStatisticContainerElement = document.querySelector('#primary-statistics-container');
    primaryStatisticContainerElement.append(newPrimaryStatisticElement);

    const editElement = newPrimaryStatisticLabelElement.nextElementSibling;
    editElement.addEventListener('click', primaryStatisticModule.openEditPrimaryStatisticModal);

    const deletedPrimaryStatisticButtonElement = newPrimaryStatisticIdElement.querySelector('.has-text-danger');

    deletedPrimaryStatisticButtonElement.addEventListener('click', primaryStatisticModule.openDeletePrimaryStatisticModal);

    const response = await api.getUser(token);
    if (response.role == "member") {
      const noneElements = document.querySelectorAll('.none');
      for (const noneElement of noneElements) {
        noneElement.classList.add('hidden')
      }   
    }
  }
  },

  openAddPrimaryStatisticModal(){
    const addPrimaryStatisticModalElement = document.querySelector('#add-primary-statistic-modal');
    addPrimaryStatisticModalElement.classList.add('is-active');

  },

  openEditPrimaryStatisticModal(event){

    const clickedDiv = event.currentTarget;

    const primaryStatisticElement = clickedDiv.closest('[slot="primary-statistic-id"');

    const primaryStatisticId = primaryStatisticElement.dataset.id;

    const editModalElement = document.querySelector('#edit-primary-statistic-modal');
    editModalElement.classList.add('is-active');

    const inputHiddenIdElement = editModalElement.querySelector('[name="id"]');
    inputHiddenIdElement.value = primaryStatisticId;

    const inputLabelContentElement = editModalElement.querySelector('[name="label"]');
    inputLabelContentElement.value = clickedDiv.previousSibling.previousSibling.textContent;

  },

  openDeletePrimaryStatisticModal(event){
    const clickedButton = event.currentTarget;
    const primaryStatisticElement = clickedButton.closest('.primary-statistic');

    const primaryStatisticId = primaryStatisticElement.dataset.id;
    const primaryStatisticLabel = primaryStatisticElement.querySelector('[slot="primary-statistic-label"]').textContent;

    const deletedPrimaryStatisticModalElement = document.querySelector('#delete-primary-statistic-modal');
    deletedPrimaryStatisticModalElement.classList.add('is-active');

    const inputHiddenIdElement = deletedPrimaryStatisticModalElement.querySelector('[name="id"]');
    inputHiddenIdElement.value = primaryStatisticId;

    const contentSlotElement = deletedPrimaryStatisticModalElement.querySelector('[slot="primary-statistic-label"]');
    contentSlotElement.textContent = primaryStatisticLabel;

  },

};

export default primaryStatisticModule;