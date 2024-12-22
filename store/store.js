import { todoReducer } from "./reducers/todo.reducer.js"


const { createStore, combineReducers} = Redux

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const appReducer = combineReducers({
    todoModule: todoReducer
})

export const store = createStore(appReducer, composeEnhancers()) //it's stuck here
window.gstore = store