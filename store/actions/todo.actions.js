import { todoService } from "../../services/todo.service.js";
import { store } from '../store.js';
import { SET_FILTER, SET_IS_LOADING, SET_TODOS, REMOVE_TODO, UNDO_TODOS, TOGGLE_TODO, CHANGE_COLOR} from '../reducers/todo.reducer.js'

// IS THIS OK?
export function setDefaultFilter(searchParams = null) {
    console.log('setDefaultFilter');
    if(searchParams){
        store.dispatch({ type: SET_FILTER, filter: todoService.getFilterFromSearchParams(searchParams) })
    }
    else {
        store.dispatch({ type: SET_FILTER, filter: todoService.getDefaultFilter() })
    }
}

export function setFilter(filterBy) {
    console.log('setFilter');
    store.dispatch({ type: SET_FILTER, filter: filterBy})
}

export async function loadTodos() {
    console.log('loadTodos');
    store.dispatch({type: SET_IS_LOADING, isLoading: true})
    return todoService.query(store.getState().todoModule.currentFilterBy)
    .then(todos => {
        store.dispatch({type: SET_TODOS, todos})
    })
    .catch(err => {
        console.log('Cannot load todos in todo.action', err)
        throw err
    })
    .finally(() => {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false})
    })
}

export async function removeTodo(todoId) {
    console.log('removeTodo');
    store.dispatch({ type: REMOVE_TODO, todoId})
    return todoService.remove(todoId)
    .catch(err => {
        console.log('err:', err)
        store.dispatch({ type: UNDO_TODOS })
        throw err
    })
}

export async function toggleTodo(todo) {
    console.log('toggleTodo');
    const todoToSave = { ...todo, isDone: !todo.isDone }
    store.dispatch({ type: TOGGLE_TODO, todoId:todo._id})
    return todoService.save(todoToSave)
    .catch(err => {
        store.dispatch({ type: UNDO_TODOS })
        console.log('Cannot toggle:', err)
        throw err
    })
}

export async function changeColor(todo, newColor) {
    console.log('changeColor');
    store.dispatch({ type: CHANGE_COLOR, todoId: todo._id, newColor: newColor})
    const todoToSave = { ...todo, color: newColor }
    console.log('todoToSave:');
    console.log(todoToSave);
    return todoService.save(todoToSave)
    .catch(err => {
        store.dispatch({ type: UNDO_TODOS })
        console.log('Cannot change color:', err)
        throw err
    })
}