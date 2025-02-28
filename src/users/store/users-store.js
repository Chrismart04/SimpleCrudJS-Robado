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

    async loadNextPage() {
        if (this.state.currentPage >= 7) return;
        const users = await loadUsers(this.state.currentPage + 1);
        if (users.length === 0) return;
        this.state.currentPage += 1;
        this.state.users = users;
    }

    async loadPreviousPage() {
        if (this.state.currentPage <= 1) return;
        const users = await loadUsers(this.state.currentPage - 1);
        if (users.length === 0) return;
        this.state.currentPage -= 1;
        this.state.users = users;
    }

// TODO: implemetar

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
    loandNextPage,
    loadPreviousPage,
    onUserChanged,
    onUserDeleted,  // Agregamos la nueva función
    reloadPage,
    inicioButton,
    finButton,
    getUsers: () => [...state.users],
    getCurrentPage: () => state.currentPage,

}