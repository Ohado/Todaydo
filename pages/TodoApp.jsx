import { TodoFilter } from "../cmps/TodoFilter.jsx"
import { TodoList } from "../cmps/TodoList.jsx"
import { DataTable } from "../cmps/data-table/DataTable.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { loadTodos, setDefaultFilter, removeTodo, toggleTodo, setFilter, changeColor } from "../store/actions/todo.actions.js"
import { addToBalance } from "../store/actions/user.actions.js"

const { useState, useEffect,useRef } = React
const { Link, useSearchParams } = ReactRouterDOM
const { useSelector } = ReactRedux

export function TodoApp() {
    const todoIndexRef = useRef()

    // Special hook for accessing search-params:
    // const [todos, setTodos] = useState(null)
    const todos = useSelector(storeState => storeState.todoModule.todos)
    const user = useSelector(storeState => storeState.userModule.loggedUser)
    
    // HOW TO DO SEARCH PARAMS?
    // const [searchParams, setSearchParams] = useSearchParams()
    // const defaultFilter = todoService.getFilterFromSearchParams(searchParams)
    
    // const [filterBy, setFilterBy] = useState(defaultFilter)
    const filterBy = useSelector(storeState => storeState.todoModule.currentFilterBy)
    // setDefaultFilter(useSearchParams())

    useEffect(() => {
        document.title = 'Todo List';
        loadTodos()
            .catch(err => {
                console.error('Cannot load todos:', err)
                showErrorMsg('Cannot load todos')
            })
    }, [filterBy])

    async function onRemoveTodo(todoId) {
        if (confirm('Remove this Todo?'))
            removeTodo(todoId)
                .then(() => {
                    showSuccessMsg(`Todo removed`)
                })
                .catch(err => {
                    showErrorMsg('Cannot remove todo ' + todo.description)
                })
    }

    async function onToggleTodo(todo) {
        toggleTodo(todo)
        .then((savedTodo) => {
                if(savedTodo.isDone)
                    addToBalance(user, 10)
                showSuccessMsg(`Todo is ${(savedTodo.isDone)? 'done. You just won 10 credits!' : 'back on your list'}`)
            })
            .catch(err => {
                showErrorMsg('Cannot toggle todo "' + todo.description + '"')
                throw(err)
            })
    }

    function handleChangeColor(event, todo) {
        const newColor = event.target.value
        changeColor(todo, newColor)
    }

    function onSetFilter(filterBy) {
        setFilter(filterBy)
    }

    useEffect(()=>{
        todoIndexRef.current.style["--color-bg"] = 'red'
    },[])

    if (!todos) return <div>Loading...</div>
    return (
        <section ref={todoIndexRef} className="todo-index" >
            <TodoFilter filterBy={filterBy} onSetFilterBy={onSetFilter} />
            <div>
                <Link to="/todo/edit" className="btn" >Add Todo</Link>
            </div>
            <h2>Todos List</h2>
            <TodoList todos={todos} onRemoveTodo={onRemoveTodo} onToggleTodo={onToggleTodo} handleChange={handleChangeColor} />
            <hr />
            <h2>Todos Table</h2>
            <div style={{ width: '60%', margin: 'auto' }}>
                <DataTable todos={todos} onRemoveTodo={onRemoveTodo} />
            </div>
        </section>
    )
}
