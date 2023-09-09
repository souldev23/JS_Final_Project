
/**
 * 
 * @param {String|Number} id 
 * @returns {Like<User>}
 */
export const deleteUser = async(id) => {
    const url = `${import.meta.env.VITE_BASE_URL}/users/${id}`;
    const res = await fetch(url, {
        method: 'DELETE',        
    });

    const data = await res.json();
    console.log({data});

    return true;
}