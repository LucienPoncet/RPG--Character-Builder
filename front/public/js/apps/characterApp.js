import characterModule from '../modules/characterModule.js';
import api from '../api.js';

const app = {

  listenToUserActions(token){
    const noneElements = document.querySelectorAll('.none');
    for (const noneElement of noneElements) {
      noneElement.classList.remove('hidden')
    }
    characterModule.listenToAddCharacterButtonClick();
    characterModule.listenToAddCharacterFormSubmit(token);
    characterModule.listenToEditCharacterFormSubmit(token);
    characterModule.listenToDeleteCharacterFormSubmit(token);
  },

  async init(){
    const token = localStorage.getItem("token");

    if(token){
      await characterModule.getCharactersFromAPI(token);
      await characterModule.editClassesFromAPI(token);
      await characterModule.getClassesFromAPI(token);
      await characterModule.editRacesFromAPI(token);
      await characterModule.getRacesFromAPI(token);

      const noneElements = document.querySelectorAll('.none');
      for (const noneElement of noneElements) {
        noneElement.classList.add('hidden')
      }

      const response = await api.getUser(token);
      if (response.role == "member" || response.role == "admin") {
        app.listenToUserActions(token);   
      }
      if (response.role == "admin") {
        const allCharacters = document.querySelector('.allchara');
        allCharacters.classList.remove('hidden');
      }
    }else{
      window.location = "../../signin.html";
    }
  },
};

document.addEventListener('DOMContentLoaded', app.init);