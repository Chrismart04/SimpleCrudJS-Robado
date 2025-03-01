import { loadUsers } from "../users-case/load-users-by-page";


const state = {
  currentPage: 0,
  users: []

}
const inicioButton = async () => {
    const user = await loadUsers(1);
    if (user.length === 0) return;
    state.currentPage = 1;
    state.users =  user
}
const  finButton = async () => {
    const user = await loadUsers(6);
    if (user.length === 0) return;
    state.currentPage = 6;
    state.users =  user
}

const loadNextPage = async () => {
    if (state.currentPage >= 7) return;
    const users = await loadUsers(state.currentPage + 1);
    if (users.length === 0) return;
    state.currentPage += 1;
    state.users = users;
}

const loadPreviousPage = async () => {
    if (state.currentPage <= 1) return;
    const users = await loadUsers(state.currentPage - 1);
    if (users.length === 0) return;
    state.currentPage -= 1;
    state.users = users;
}

const onUserChanged = (updatedUser) => {
    let wasFound = false;
    
    state.users = state.users.map(user => {
        if (user.id === updatedUser.id) {
            wasFound = true;
            return updatedUser;
        }
        return user;
    });

    if (!wasFound) {
        state.users.push(updatedUser);
    }
}

const onUserDeleted = (id) => {
    state.users = state.users.filter(user => user.id !== id);
}

const reloadPage = async () => {
    throw new Error('Not implemented')

}

export default {
    loadNextPage,
    loadPreviousPage,
    onUserChanged,
    onUserDeleted,
    reloadPage,
    inicioButton,
    finButton,
    getUsers: () => [...state.users],
    getCurrentPage: () => state.currentPage,

}