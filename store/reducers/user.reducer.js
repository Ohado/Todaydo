import { todoService } from "../../services/todo.service.js"
import { userService } from "../../services/user.service.js"

const initialState = {
    loggedUser: userService.getLoggedinUser(),
}

export function todoReducer(state = initialState, cmd = {}){

}