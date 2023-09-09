import usersStore from '../../store/users-store'
import { deleteUser } from '../../use-cases/delete-user-by-id';
import { showModal } from '../render-modal/render-modal';
import './render-table.css';

let table;

const createTable = () => {
    const table = document.createElement('table');
    const tableHeaders = document.createElement('thead');
    tableHeaders.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Balance</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Active</th>
            <th>Gender</th>
            <th>Actions</th>            
        </tr>
    `;
    const tBody = document.createElement('tbody');
    table.append(tableHeaders, tBody);
    return table;
}

const tableSelectedEvent = (event) => {
    const element = event.target.closest('.selected-user');
    if(!element) return;

    const id = element.getAttribute('data-id');
    showModal(id);
}
const tableDeleteEvent = async(event) => {
    const element = event.target.closest('.delete-user');
    if(!element) return;

    const id = element.getAttribute('data-id');
    try {
        await deleteUser(id);
        await usersStore.reloadPage();
        document.querySelector('#current-page').innerText = usersStore.getCurrentPage();
        renderTable();
    } catch (error) {
        alert(error);
    }
}
/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderTable = (element) => {
    const users = usersStore.getUsers();
    if(!table){
        table = createTable();
        element.append(table);

        //TODO: add listeners to the table
        table.addEventListener('click', tableSelectedEvent);
        table.addEventListener('click', tableDeleteEvent);
    }

    let tableHTML = '';
    users.forEach( user => {
        tableHTML += `
        <tr>
            <td>${user.id}</td>
            <td>${user.balance}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.isActive}</td>
            <td>${user.gender}</td>
            <td>
                <a href="#/" class="selected-user" data-id="${user.id}">Select</a>
                |
                <a href="#/" class="delete-user" data-id="${user.id}">Delete</a>
            </td>            
        </tr>
        `;
    });
    if(users.length === 0 && usersStore.getCurrentPage() === 1){
        table.querySelector('tbody').innerHTML = '';
        return;
    }

    table.querySelector('tbody').innerHTML = tableHTML;
}