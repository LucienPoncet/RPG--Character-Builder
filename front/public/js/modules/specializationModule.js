import utils from '../utils.js';
import api from '../api.js';

const specializationModule = {


  listenToAddSpecializationFormSubmit(token){
    const addSpecializationFormElement = document.querySelector('#add-specialization-modal form');

    addSpecializationFormElement.addEventListener('submit', async (event) => {

      event.preventDefault();
      console.log('Soumission du formulaire');

      const addSpecializationForm = event.currentTarget;

      const addSpecializationFormData = new FormData(addSpecializationForm);
      const specializationData = Object.fromEntries(addSpecializationFormData);

      const createdSpecialization = await api.createSpecialization(specializationData, token);

      if (createdSpecialization){
        specializationModule.addSpecializationToDom(createdSpecialization);

        addSpecializationForm.reset();

        utils.closeModals();

      }
    });
  },


  listenToEditSpecializationFormSubmit(token){

    const editSpecializationFormElement = document.querySelector('#edit-specialization-modal form');

    editSpecializationFormElement.addEventListener('submit', async (event) => {

      event.preventDefault();

      const submittedEditSpecializationFormElement = event.currentTarget;

      const submittedEditSpecializationFormData = new FormData(submittedEditSpecializationFormElement);
      const specializationData = Object.fromEntries(submittedEditSpecializationFormData);

      const updatedSpecialization = await api.updateSpecialization(specializationData, token);

      if (updatedSpecialization){
        const specializationLabelElement = document.querySelector(`[slot="specialization-id"][data-id="${specializationData.id}"] [slot="specialization-label"]`);
        specializationLabelElement.textContent = updatedSpecialization.label;

        submittedEditSpecializationFormElement.reset();

        utils.closeModals();
      }
    });
  },

  listenToDeleteSpecializationFormSubmit(token){
    const deleteSpecializationFormElement = document.querySelector('#delete-specialization-modal form');

    deleteSpecializationFormElement.addEventListener('submit', async (event) => {
      event.preventDefault();

      const deletedSpecializationForm = event.currentTarget;

      const deletedSpecializationFormData = new FormData(deletedSpecializationForm);

      const specializationToDelete = Object.fromEntries(deletedSpecializationFormData);

      const specializationId = specializationToDelete.id;

      const isSpecializationDeleted = await api.deleteSpecialization(specializationId, token);

      if (isSpecializationDeleted){
        const specializationToDeleteElement = document.querySelector(`[slot="specialization-id"][data-id="${specializationId}"]`);
        specializationToDeleteElement.remove();
        utils.closeModals();
      }

    });

  },


  addSpecializationToDom(specialization){

    const specializationTemplate = document.querySelector("#specialization-template");
    const newSpecializationElement = specializationTemplate.content.cloneNode(true);

    const newSpecializationLitleElement = newSpecializationElement.querySelector('[slot="specialization-label"]');
    newSpecializationLitleElement.textContent = specialization.label;

    const newSpecializationIdElement = newSpecializationElement.querySelector('[slot="specialization-id"]');
    newSpecializationIdElement.dataset.id= specialization.id;

    const classElement = document.querySelector(`[slot="class-id"][data-id="${specialization.class_id}"]`);

    const specializationsContainer = classElement.querySelector('[slot="class-content"]');
    
    specializationsContainer.append(newSpecializationElement);

    const editElement = newSpecializationLitleElement.nextElementSibling;
    editElement.addEventListener('click', specializationModule.openEditSpecializationModal);

    const deletedSpecializationButtonElement = newSpecializationIdElement.querySelector('.has-text-danger');

    deletedSpecializationButtonElement.addEventListener('click', specializationModule.openDeleteSpecializationModal);

  },

  openAddSpecializationModal(classId){
    const addSpecializationModalElement = document.querySelector('#add-specialization-modal');
    addSpecializationModalElement.classList.add('is-active');

    const classIdInputElement = addSpecializationModalElement.querySelector('[name="class_id"]');
    classIdInputElement.value = classId;
  },

  openEditSpecializationModal(event){

    const clickedDiv = event.currentTarget;
    console.log(clickedDiv);

    const specializationElement = clickedDiv.closest('[slot="specialization-id"');
    console.log(specializationElement);

    const specializationId = specializationElement.dataset.id;

    const editModalElement = document.querySelector('#edit-specialization-modal');
    editModalElement.classList.add('is-active');

    const inputHiddenIdElement = editModalElement.querySelector('[name="id"]');
    inputHiddenIdElement.value = specializationId;

    const inputTextContentElement = editModalElement.querySelector('[name="label"]');
    inputTextContentElement.value = clickedDiv.previousSibling.previousSibling.textContent;
  },

  openDeleteSpecializationModal(event){
    const clickedButton = event.currentTarget;
    const specializationElement = clickedButton.closest('.specialization');

    const specializationId = specializationElement.dataset.id;
    const specializationLabel = specializationElement.querySelector('[slot="specialization-label"]').textContent;

    const deletedSpecializationModalElement = document.querySelector('#delete-specialization-modal');
    deletedSpecializationModalElement.classList.add('is-active');

    const inputHiddenIdElement = deletedSpecializationModalElement.querySelector('[name="id"]');
    inputHiddenIdElement.value = specializationId;

    const contentSlotElement = deletedSpecializationModalElement.querySelector('[slot="specialization-label"]');
    contentSlotElement.textContent = specializationLabel;

  },

};

export default specializationModule;