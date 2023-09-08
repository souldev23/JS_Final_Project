import modalHTML from "./render-modal.html?raw";
import './render-modal.css'

let modal, form;

export const showModal = () => {    
    modal?.classList.remove('hidden-modal');
}

export const hideModal = () => {
    modal?.classList.add('hidden-modal');
    form?.reset();
}

/**
 * 
 * @param {HTMLDivElement} element 
 * @param {(userLike)=> Promise<void>} callback 
 * @returns 
 */
export const renderModal = (element, callback) => {

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

    form.addEventListener('submit', async(event) => {
        event.preventDefault();
        
        const formData = new FormData( form );
        const userLike = {};
        for(const [key, value] of formData){            
            if(key === 'balance'){
                userLike[key] = Number(value);
                continue;
            }
            if(key === 'isActive'){
                userLike[key] = (value === 'on') ? true : false;
                continue;
            }
            userLike[key] = value;
        }
        if(!userLike.isActive) userLike['isActive'] = false;
        
        await callback(userLike);

        hideModal();
    });

}