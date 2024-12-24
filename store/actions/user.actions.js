import { userService } from "../../services/user.service.js";
import { store } from "../store.js";
import { LOG_IN, LOG_OUT, SET_USER } from "../reducers/user.reducer.js";

export async function logout() {
    userService.logout()
        .then(() => {
            store.dispatch({type: LOG_OUT})
            return Promise.resolve()
        })
        .catch((err) => {
            console.error('error on logout: ' + err)
            throw err 
        })
}

export function login(user){
    store.dispatch({type: LOG_IN, user: user})
}

export function addToBalance(user, toAdd) {
    const userToSave = {...user, balance: user.balance + toAdd}
    store.dispatch({type: SET_USER, user: userToSave})
    return userService.setBalance(user, user.balance + toAdd)
}