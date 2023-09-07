import { loadUsersByPage } from "../use-cases/load-users-by-page";

const state = {
    currentPage: 0,
    users: [],
}

const loadNextPage = async() => {
    const users = await loadUsersByPage(state.currentPage + 1);
    if(users.length === 0) return;

    state.currentPage += 1;
    state.users = users;
}

const loadPreviousPage = async() => {    
    if(state.currentPage === 1) return;
    state.currentPage -= 1;
    const users = await loadUsersByPage(state.currentPage);    
    state.users = users;
}

const onUserChanged = () => {
    throw new Error("Not implemented yet");
}

const reloadPage = async() => {
    throw new Error("Not implemented yet");
}

export default{
    loadNextPage,
    loadPreviousPage,
    onUserChanged,
    reloadPage,

    getUsers: () => [... state.users],
    getCurrentPage: () => state.currentPage,
}