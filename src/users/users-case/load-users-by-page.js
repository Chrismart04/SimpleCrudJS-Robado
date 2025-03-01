import { localhostUserToModel } from "../mappers/localhost-user.mapper";

export const loadUsers = async (page = 1) => {
    try {
        const url = `${import.meta.env.VITE_BASE_URL}/users?_page=${page}`;
        const res = await fetch(url);
        
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const response = await res.json();
        
        
        const users = response.data;
        
        if (!Array.isArray(users)) {
            console.error('API response data is not an array:', users);
            return [];
        }
        
        return users.map(localhostUserToModel);
    } catch (error) {
        console.error('Error loading users:', error);
        return [];
    }
}