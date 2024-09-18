import raceModule from '../modules/raceModule.js';
import api from '../api.js';

const app = {

  listenToUserActions(token){
    const noneElements = document.querySelectorAll('.none');
    for (const noneElement of noneElements) {
      noneElement.classList.remove('hidden')
    }
    raceModule.listenToAddRaceButtonClick();
    raceModule.listenToAddRaceFormSubmit(token);
    raceModule.listenToEditRaceFormSubmit(token);
    raceModule.listenToDeleteRaceFormSubmit(token);
  },

  async init(){
    const token = localStorage.getItem("token");

    if(token){
      await raceModule.getRacesFromAPI(token);
      await raceModule.getPrimarySkillsFromAPI(token);
      await raceModule.getPrimaryStatisticsFromAPI(token);
      
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