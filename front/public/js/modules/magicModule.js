import utils from '../utils.js';
import api from '../api.js';

const magicModule = {

  listenToAddMagicButtonClick(){
    const addMagicButtonElement = document.querySelector('#addMagicButton');
    addMagicButtonElement.addEventListener('click', magicModule.openAddMagicModal);

    const closeElements = document.querySelectorAll('.button.close, .delete.close, .modal-background');

    for (const closeElement of closeElements){
      closeElement.addEventListener('click', utils.closeModals);
    }
  },

  listenToAddMagicFormSubmit(token){
    const addMagicFormElement = document.querySelector('#add-magic-modal form');

    addMagicFormElement.addEventListener('submit', async (event) => {

      event.preventDefault();
      console.log('Soumission du formulaire');

      const addMagicForm = event.currentTarget;

      const addMagicFormData = new FormData(addMagicForm);
      const magicData = Object.fromEntries(addMagicFormData);

      const createdMagic = await api.createMagic(magicData, token);

      if (createdMagic){
        magicModule.addMagicToDom(createdMagic);

        addMagicForm.reset();

        utils.closeModals();

      }
    });
  },


  listenToEditMagicFormSubmit(token){

    const editMagicFormElement = document.querySelector('#edit-magic-modal form');

    editMagicFormElement.addEventListener('submit', async (event) => {

      event.preventDefault();

      const submittedEditMagicFormElement = event.currentTarget;

      const submittedEditMagicFormData = new FormData(submittedEditMagicFormElement);
      const magicData = Object.fromEntries(submittedEditMagicFormData);

      const updatedMagic = await api.updateMagic(magicData, token);

      if (updatedMagic){
        const magicLabelElement = document.querySelector(`[slot="magic-id"][data-id="${magicData.id}"] [slot="magic-label"]`);
        magicLabelElement.textContent = updatedMagic.label;

        submittedEditMagicFormElement.reset();

        utils.closeModals();
      }
    });
  },

  listenToDeleteMagicFormSubmit(token){
    const deleteMagicFormElement = document.querySelector('#delete-magic-modal form');

    deleteMagicFormElement.addEventListener('submit', async (event) => {
      event.preventDefault();

      const deletedMagicForm = event.currentTarget;

      const deletedMagicFormData = new FormData(deletedMagicForm);

      const magicToDelete = Object.fromEntries(deletedMagicFormData);

      const magicId = magicToDelete.id;

      const isMagicDeleted = await api.deleteMagic(magicId, token);

      if (isMagicDeleted){
        const magicToDeleteElement = document.querySelector(`[slot="magic-id"][data-id="${magicId}"]`);
        magicToDeleteElement.remove();
        utils.closeModals();
      }

    });

  },

  async getMagicsFromAPI(token){
    const magics = await api.getMagics(token);

    if (magics){
      for (const magicToAdd of magics){
        magicModule.addMagicToDom(magicToAdd);
      }
    }
  },


  addMagicToDom(magic){

    const magicTemplate = document.querySelector("#magic-template");
    const newMagicElement = magicTemplate.content.cloneNode(true);

    const newMagicLitleElement = newMagicElement.querySelector('[slot="magic-label"]');
    newMagicLitleElement.textContent = magic.label;

    const newMagicIdElement = newMagicElement.querySelector('[slot="magic-id"]');
    newMagicIdElement.dataset.id = magic.id;

    const magicContainerElement = document.querySelector('#magics-container');
    magicContainerElement.append(newMagicElement);

    const editElement = newMagicLitleElement.nextElementSibling;
    editElement.addEventListener('click', magicModule.openEditMagicModal);

    const deletedMagicButtonElement = newMagicIdElement.querySelector('.has-text-danger');

    deletedMagicButtonElement.addEventListener('click', magicModule.openDeleteMagicModal);

  },

  openAddMagicModal(){
    const addMagicModalElement = document.querySelector('#add-magic-modal');
    addMagicModalElement.classList.add('is-active');

  },

  openEditMagicModal(event){

    const clickedDiv = event.currentTarget;

    const magicElement = clickedDiv.closest('[slot="magic-id"');

    const magicId = magicElement.dataset.id;

    const editModalElement = document.querySelector('#edit-magic-modal');
    editModalElement.classList.add('is-active');

    const inputHiddenIdElement = editModalElement.querySelector('[name="id"]');
    inputHiddenIdElement.value = magicId;

    const inputTextContentElement = editModalElement.querySelector('[name="label"]');
    inputTextContentElement.value = clickedDiv.previousSibling.previousSibling.textContent;
  },

  openDeleteMagicModal(event){
    const clickedButton = event.currentTarget;
    const magicElement = clickedButton.closest('.magic');

    const magicId = magicElement.dataset.id;
    const magicLabel = magicElement.querySelector('[slot="magic-label"]').textContent;

    const deletedMagicModalElement = document.querySelector('#delete-magic-modal');
    deletedMagicModalElement.classList.add('is-active');

    const inputHiddenIdElement = deletedMagicModalElement.querySelector('[name="id"]');
    inputHiddenIdElement.value = magicId;

    const contentSlotElement = deletedMagicModalElement.querySelector('[slot="magic-label"]');
    contentSlotElement.textContent = magicLabel;

  },

};

export default magicModule;