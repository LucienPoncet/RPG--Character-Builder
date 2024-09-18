import primarySkillModule from '../modules/primarySkillModule.js';
import api from '../api.js';

const app = {

  listenToUserActions(token){
    const noneElements = document.querySelectorAll('.none');
    for (const noneElement of noneElements) {
      noneElement.classList.remove('hidden')
    }
    primarySkillModule.listenToAddPrimarySkillButtonClick();
    primarySkillModule.listenToAddPrimarySkillFormSubmit(token);
    primarySkillModule.listenToEditPrimarySkillFormSubmit(token);
    primarySkillModule.listenToDeletePrimarySkillFormSubmit(token);
  },

  async init(){
    const token = localStorage.getItem("token");

    if(token){
      await primarySkillModule.getPrimarySkillsFromAPI(token);

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