import signupModule from '../modules/signupModule.js';

const app = {

  listenToUserActions(){
    signupModule.listenToForm();
    signupModule.sendData();
  },

  async init(){
    app.listenToUserActions();
  },
};

document.addEventListener('DOMContentLoaded', app.init);