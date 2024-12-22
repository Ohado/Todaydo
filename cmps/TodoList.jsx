import { TodoPreview } from "./TodoPreview.jsx"
const { Link } = ReactRouterDOM

export function TodoList({ todos, onRemoveTodo, onToggleTodo, handleChange }) {
    return (
        <ul className="todo-list">
            {todos.map(todo =>
                <li key={todo._id} style={{background: todo.color}}>
                    <section className="color-btn-container" style={{background: 'radial-gradient(circle, '+todo.color+' 35%, #c9b1c5 70%)'}} >
                        <input id={"colorpicker"+todo._id} type="color" className="color-btn" value={todo.color} onChange={(e)=> handleChange(e, todo)}/>
                        <label htmlFor={"colorpicker"+todo._id} className="color-icon">🎨</label>
                    </section>
                    <TodoPreview todo={todo} onToggleTodo={()=>onToggleTodo(todo)} />
                    <section>
                        <button onClick={() => onRemoveTodo(todo._id)}>Remove</button>
                        <button><Link to={`/todo/${todo._id}`}>Details</Link></button>
                        <button><Link to={`/todo/edit/${todo._id}`}>Edit</Link></button>
                    </section>
                </li>
            )}
        </ul>
    )
}