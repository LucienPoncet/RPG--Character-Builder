import api from '../api.js';

const app = {
    async init(){
        document.querySelector("form").addEventListener("submit",app.sendData);
    },

    async sendData(event){

        event.preventDefault();

        const formData = new FormData(event.target);

        const data = {};

        formData.forEach((value, key) => data[key] = value);

        const user = await api.signinUser(data);

        if (!user) {
           window.location = "../../signin.html"
           alert("Il semble que vous ayez fait une erreur...")
        } else {
            localStorage.setItem("token", user.token);

            document.cookie = `firstname=${user.firstname};`;
            document.cookie = `lastname=${user.lastname}`;

            window.location = "../../user.html"            

        }

    }
};

app.init();
