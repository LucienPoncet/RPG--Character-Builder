import api from '../api.js';

const app = {

    async init(){
        document.querySelector("form").addEventListener("submit",app.sendData);
    },

    async sendData(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const data = {};

        formData.forEach((value, key) => data[key] = value);

        const newUser = await api.signupUser(data);

        if (newUser === undefined) {
            window.location = "../../index.html"
        } else {
            window.location = "../../signin.html"
        }
       
    }

};

app.init();
