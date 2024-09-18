import utils from '../utils.js';
import api from '../api.js';

import specializationModule from './specializationModule.js';

const classModule = {

  listenToAddClassButtonClick(){
    const addClassButtonElement = document.querySelector('#addClassButton');
    addClassButtonElement.addEventListener('click', classModule.openAddClassModal);

    const closeElements = document.querySelectorAll('.button.close, .delete.close, .modal-background');

    for (const closeElement of closeElements){
      closeElement.addEventListener('click', utils.closeModals);
    }
  },

  listenToAddClassFormSubmit(token){
    const addClassFormElement = document.querySelector('#add-class-modal form');

    addClassFormElement.addEventListener('submit', async (event) => {

      event.preventDefault();
      console.log('Soumission du formulaire');

      const addClassForm = event.currentTarget;

      const addClassFormData = new FormData(addClassForm);
      const classData = Object.fromEntries(addClassFormData);

      const createdClass = await api.createClass(classData, token);

      if (createdClass){
        classModule.addClassToDom(createdClass, token);

        addClassForm.reset();

        utils.closeModals();

      }
    });
  },


  listenToEditClassFormSubmit(token){

    const editClassFormElement = document.querySelector('#edit-class-modal form');

    editClassFormElement.addEventListener('submit', async (event) => {

      event.preventDefault();

      const submittedEditClassFormElement = event.currentTarget;

      const submittedEditClassFormData = new FormData(submittedEditClassFormElement);
      const classData = Object.fromEntries(submittedEditClassFormData);
      console.log(classData);

      const updatedClass = await api.updateClass(classData, token);

      if (updatedClass){

        const classLabelElement = document.querySelector(`[slot="class-id"][data-id="${classData.id}"] [slot="class-label"]`);
        classLabelElement.textContent = updatedClass.label;

        const classMagicElement = document.querySelector(`[slot="class-id"][data-id="${classData.id}"] [slot="class-magic"]`);
        classMagicElement.textContent = `Magie en cours d'évolution`;

        submittedEditClassFormElement.reset();

        utils.closeModals();
      }
    });
  },

  listenToDeleteClassFormSubmit(token){
    const deleteClassFormElement = document.querySelector('#delete-class-modal form');

    deleteClassFormElement.addEventListener('submit', async (event) => {
      event.preventDefault();

      const deletedCLassForm = event.currentTarget;

      const deletedClassFormData = new FormData(deletedCLassForm);

      const classToDelete = Object.fromEntries(deletedClassFormData);

      const classId = classToDelete.id;

      const isClassDeleted = await api.deleteClass(classId, token);

      if (isClassDeleted){
        const classToDeleteElement = document.querySelector(`[slot="class-id"][data-id="${classId}"]`);
        classToDeleteElement.remove();
        utils.closeModals();
      }

    });

  },


  async getClassesFromAPI(token){
    const classes = await api.getClasses(token);

    if (classes){
      for (const classToAdd of classes){
        classModule.addClassToDom(classToAdd, token);
      }
    }
  },


  addClassToDom(classToAdd, token){

    const classTemplate = document.querySelector("#class-template");
    const newClassElement = classTemplate.content.cloneNode(true);

    const newClassLitleElement = newClassElement.querySelector('[slot="class-label"]');
    newClassLitleElement.textContent = classToAdd.label;

    const newClassIdElement = newClassElement.querySelector('[slot="class-id"]');
    newClassIdElement.dataset.id= classToAdd.id;

    const addSpecializationButtonElement = newClassElement.querySelector('[slot="add-card-button"]');
    addSpecializationButtonElement.addEventListener('click', (event) => {
      const clickedButton = event.currentTarget;
      const classElement = clickedButton.closest('[slot="class-id"]');
      const classId = classElement.dataset.id;

      specializationModule.openAddSpecializationModal(classId);
    });

    const classContainerElement = document.querySelector('#classes-container');
    classContainerElement.append(newClassElement);

    const editElement = newClassLitleElement.nextElementSibling;
    editElement.addEventListener('click', classModule.openEditClassModal);

    const deletedClassButtonElement = newClassIdElement.querySelector('.has-text-danger');

    deletedClassButtonElement.addEventListener('click', classModule.openDeleteClassModal);

    if (classToAdd.specializations){

      for (const specialization of classToAdd.specializations){

        specializationModule.addSpecializationToDom(specialization);
      }
    }

    if (classToAdd.magic_id) {
      classModule.putMagic(classToAdd, token)
    }

  },

  openAddClassModal(){
    const addClassModalElement = document.querySelector('#add-class-modal');
    addClassModalElement.classList.add('is-active');
  },

  async putMagic(classToAdd, token){
    const magics = await api.getMagics(token);
    for (const magic of magics) {
      if (magic.id === classToAdd.magic_id) {
        const newClassElements = document.querySelectorAll('[slot="class-label"]');
        for (const newClassElement of newClassElements) {
          if (newClassElement.textContent === classToAdd.label) {
            const newMagicElement = newClassElement.parentNode.nextElementSibling;
            newMagicElement.append(`MAGIE ${magic.label}`);
          }
        }
      }
    }
  },

  async getMagicsFromAPI(token){

    const magics = await api.getMagics(token);

    const magicsContainer = document.querySelectorAll('.magic-container');

    for (const magic of magics) {
      for (const magicContainer of magicsContainer) {
        const clone = magicContainer.cloneNode();
        clone.value = magic.id;
        const select = document.querySelector('#magic_id');
        select.append(clone);
        if (clone.value == magic.id) {
          clone.hidden = false;
          clone.textContent = magic.label;
        }
      }
    }
  },

  async editMagicsFromAPI(token){

    const magics = await api.getMagics(token);

    const magicsContainer = document.querySelectorAll('.new-magic-container');

    for (const magic of magics) {
      for (const magicContainer of magicsContainer) {
        const clone = magicContainer.cloneNode();
        clone.value = magic.id;
        const select = document.querySelector('#edit_magic_id');
        select.append(clone);
        if (clone.value == magic.id) {
          clone.hidden = false;
          clone.textContent = magic.label;
        }
      }
    }
  },

  openEditClassModal(event){

    const clickedDiv = event.currentTarget;

    const classElement = clickedDiv.closest('[slot="class-id"');

    const classId = classElement.dataset.id;

    const editModalElement = document.querySelector('#edit-class-modal');
    editModalElement.classList.add('is-active');

    const inputHiddenIdElement = editModalElement.querySelector('[name="id"]');
    inputHiddenIdElement.value = classId;

    const inputTextContentElement = editModalElement.querySelector('[name="label"]');
    inputTextContentElement.value = clickedDiv.previousSibling.previousSibling.textContent;

    const inputMagicContentElement = editModalElement.querySelector('.magic-label');
    const classMagic = clickedDiv.parentNode.nextElementSibling.textContent;
    inputMagicContentElement.textContent = classMagic;

  },

  openDeleteClassModal(event){
    const clickedButton = event.currentTarget;
    const classElement = clickedButton.closest('.class');

    const classId = classElement.dataset.id;
    const classLabel = classElement.querySelector('[slot="class-label"]').textContent;

    const deletedClassModalElement = document.querySelector('#delete-class-modal');
    deletedClassModalElement.classList.add('is-active');

    const inputHiddenIdElement = deletedClassModalElement.querySelector('[name="id"]');
    inputHiddenIdElement.value = classId;

    const contentSlotElement = deletedClassModalElement.querySelector('[slot="class-label"]');
    contentSlotElement.textContent = classLabel;

  },

};

export default classModule;