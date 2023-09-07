import modalHTML from "./render-modal.html?raw";
import './render-modal.css'

let modal, form;

export const showModal = () => {    
    modal?.classList.remove('hidden-modal');
}

export const hideModal = () => {
    modal?.classList.add('hidden-modal');
}

export const renderModal = (element) => {

    if(modal) return;

    modal = document.createElement('div');
    modal.innerHTML = modalHTML;
    modal.className = 'modal-container hidden-modal';

    form = modal.querySelector('form');

    element.append(modal);

    modal.addEventListener('click', (event) => {
        if(event.target.className !== 'modal-container') return;
        
        hideModal();
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log("Formulario enviado");
    });

}