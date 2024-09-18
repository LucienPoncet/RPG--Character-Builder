import classModule from '../modules/classModule.js';
import specializationModule from '../modules/specializationModule.js';
import api from '../api.js';

const app = {

  listenToUserActions(token){
    const noneElements = document.querySelectorAll('.none');
    for (const noneElement of noneElements) {
      noneElement.classList.remove('hidden')
    }

    classModule.listenToAddClassButtonClick();
    classModule.listenToAddClassFormSubmit(token);
    classModule.listenToEditClassFormSubmit(token);
    classModule.listenToDeleteClassFormSubmit(token);
    specializationModule.listenToAddSpecializationFormSubmit(token);
    specializationModule.listenToEditSpecializationFormSubmit(token);
    specializationModule.listenToDeleteSpecializationFormSubmit(token);
  },

  async init(){
    const token = localStorage.getItem("token");

    if(token){
      await classModule.editMagicsFromAPI(token);
      await classModule.getClassesFromAPI(token);
      await classModule.getMagicsFromAPI(token);

      const noneElements = document.querySelectorAll('.none');
      for (const noneElement of noneElements) {
        noneElement.classList.add('hidden')
      }

      const response = await api.getUser(token);
      if (response.role == "admin") {
        app.listenToUserActions(token);   
      }
    }else{
      window.location = "../../signin.html";
    }
  },
};

document.addEventListener('DOMContentLoaded', app.init);