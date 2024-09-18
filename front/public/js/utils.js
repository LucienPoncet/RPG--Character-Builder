const utils = {

closeModals(){
    const activeModalElements = document.querySelectorAll('.modal.is-active');
    for (const activeModalElement of activeModalElements){
    activeModalElement.classList.remove('is-active');
    }
    },
};

export function log(message){
    console.log(message);
}
  
export default utils;