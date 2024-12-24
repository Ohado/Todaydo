import { userService } from "../../services/user.service.js"

export const LOG_IN = 'LOG_IN'
export const LOG_OUT = 'LOG_OUT'
export const SET_USER = 'SET_USER'

const initialState = {
    loggedUser: userService.getLoggedinUser(),
}

export function userReducer(state = initialState, cmd = {}){
    switch(cmd.type) {
        case SET_USER:
        return {
            ...state,
            loggedUser:cmd.user
        }
        case LOG_IN:
            return {
                ...state,
                loggedUser: cmd.user
            }
        case LOG_OUT:
        return {
            ...state,
            loggedUser:null
        }
        default:
            return state
    }
}