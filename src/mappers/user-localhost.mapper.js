import { User } from "../models/user";

/**
 * 
 * @param {User} user 
 * @returns {user}
 */
export const userModelToLocalhost = (user) => {
    //Desestructuramos el objeto para convertirlo a nuestro modelo usuario
    const {
        id,
        isActive,
        balance,
        avatar,
        firstName,
        lastName,
        gender,
    } = user;
    return {
        id,
        isActive,
        balance,
        avatar,
        first_name: firstName,
        last_name: lastName,
        gender,
    };
}