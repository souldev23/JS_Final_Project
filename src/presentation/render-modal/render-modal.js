import modalHTML from "./render-modal.html?raw";
import { getUserById } from "../../use-cases/get-user-by-id";

import './render-modal.css';


let modal, form;
let loadedUser = {};

export const showModal = async(id) => {    
    modal?.classList.remove('hidden-modal');
    loadedUser = {};
    
    if(!id) return;
    const user = await getUserById(id);
    setFormValues(user);
}

export const hideModal = () => {
    modal?.classList.add('hidden-modal');
    form?.reset();
}

const setFormValues = (user) => {
    form.querySelector('[name="firstName"]').value = user.firstName;
    form.querySelector('[name="lastName"]').value = user.lastName;
    form.querySelector('[name="balance"]').value = user.balance;
    form.querySelector('[name="isActive"]').checked = user.isActive;
    loadedUser = user;
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
        if(!formData.get('isActive'))
            formData.append('isActive', 'off');

        const userLike = {...loadedUser};

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
        
        await callback(userLike);

        hideModal();
    });

}