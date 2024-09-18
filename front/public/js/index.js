import api from '../js/api.js';

const app = {

  listenToUserActions(){

    const offButtonElement = document.querySelector('#off-btn');
    offButtonElement.addEventListener('click', app.logout);

    const alllinks = document.querySelectorAll('.link');
    for (const link of alllinks) {
      link.classList.add('hidden')

      const token = localStorage.getItem("token");

        if(token){
          link.classList.remove('hidden')
        }
    };

    const allsigns = document.querySelectorAll('.sign');
    for (const sign of allsigns) {
      const token = localStorage.getItem("token");

        if(token){
            sign.classList.add('hidden')
        }
      }
  },

  logout(){
    const token = localStorage.getItem("token");

      if(token){
        localStorage.clear();
        window.location = "../index.html";
    }
  },

  async init(){

    app.listenToUserActions();

  },
};

document.addEventListener('DOMContentLoaded', app.init);