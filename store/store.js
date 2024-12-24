import { todoReducer } from "./reducers/todo.reducer.js"
import { userReducer } from "./reducers/user.reducer.js"
import { styleReducer } from "./reducers/style.reducer.js"


const { createStore, combineReducers, compose} = Redux

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const appReducer = combineReducers({
    todoModule: todoReducer,
    userModule: userReducer,
    styleModule: styleReducer,
})

export const store = createStore(appReducer, composeEnhancers()) //it's stuck here
window.gstore = store