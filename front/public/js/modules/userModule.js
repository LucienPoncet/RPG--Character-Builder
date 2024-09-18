import api from '../api.js';

const app = {
    async init(){

        const token = localStorage.getItem("token");

        if(token){
            const response = await api.getUser(token);

            const lastnameElement = document.querySelector('.lastname');
            lastnameElement.append(response.lastname);

            const firstnameElement = document.querySelector('.firstname');
            firstnameElement.append(response.firstname);

            const rolenameElement = document.querySelector('.role');
            rolenameElement.append(response.role);

        }
        else{

            window.location = "../../signin.html";
        }
    }
};

app.init();