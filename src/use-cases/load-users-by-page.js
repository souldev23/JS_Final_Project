import { localhostUserToModel } from "../mappers/localhost-user.mapper";
import { User } from "../models/user";

/**
 * 
 * @param {Number} page 
 * @returns {Promise<User[]>}
 */
export const loadUsersByPage = async(page) => {
    const base = import.meta.env.VITE_BASE_URL;    
    const url = `${base}/users?_page=${page}`;
    const res = await fetch(url);
    const data = await res.json();

    //const users = [];
    //data.forEach(element => {
    //    users.push(localhostUserToModel(element));
    //})
    const users = data.map( userLike => localhostUserToModel(userLike));
    
    return users;
}