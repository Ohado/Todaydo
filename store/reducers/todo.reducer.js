import { todoService } from "../../services/todo.service.js"

export const SET_FILTER = 'SET_FILTER'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const CHANGE_COLOR = 'CHANGE_COLOR'
export const UNDO_TODOS = 'UNDO_TODO'
// console.log(useSearchParams())
// HOW DO I DO SEARCH PARAMS?
const initialState = {
    todos : [],
    prevTodos: [],
    isLoading: true,
    currentFilterBy: todoService.getDefaultFilter(),
    searchParams: null          // is this the right thing?
}

export function todoReducer(state = initialState, cmd = {}) {
    console.log('dispatching ' + cmd.type);
    switch(cmd.type){
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: cmd.isLoading
            }
        case SET_FILTER:
            return {
                ...state,
                currentFilterBy: cmd.filter
            }
        case REMOVE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo._id !== cmd.todoId),
            }
        case SET_TODOS:
            return {
                ...state,
                prevTodos: [...state.todos],
                todos: cmd.todos,
            }
        case TOGGLE_TODO:
        return {
            ...state,
            prevTodos: [...state.todos],
            todos: state.todos.map(currTodo => (currTodo._id !== cmd.todoId) ? currTodo : { ...currTodo, isDone: !currTodo.isDone })
        }
        case CHANGE_COLOR:
        return {
            ...state,
            prevTodos: [...state.todos],
            todos: state.todos.map(currTodo => (currTodo._id !== cmd.todoId) ? currTodo : { ...currTodo, color: cmd.newColor })
        }
        case UNDO_TODOS:
            return {
            ...state,
            todos: state.prevTodos
        }
        default:
            return state
    }
}


