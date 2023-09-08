import { userModelToLocalhost } from "../mappers/user-localhost.mapper";
import {User} from "../models/user";
/**
 * 
 * @param {Like<User>} userLike 
 * @returns {Like<User>}
 */
export const saveUser = async(userLike) => {
    const user = new User(userLike);

    if(!user.firstName || !user.lastName)
        throw 'First & last name are required';
    const userToSave = userModelToLocalhost(user);

    if(user.id){
        throw Error('Update is not implemented yet');
    }

    const updatedUser = await createUser(userToSave);
    
    return updatedUser;
}

/**
 * 
 * @param {User} user 
 * @returns {Like<User>}
 */
const createUser = async(user) => {
    const url = `${import.meta.env.VITE_BASE_URL}/users`;
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const newUser = await res.json();
    console.log({newUser});

    return newUser;
}