const { useState, useEffect } = React

export function TodoFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({...filterBy})

    useEffect(() => {
        // Notify parent
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break
                    
            case 'checkbox':
                value = target.checked
                break
                        
            case 'select-one':
                if(value === ''){
                    value = undefined
                }
                else {
                    value = value === 'true'
                }
                break
            default: break
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    // Optional support for LAZY Filtering with a button
    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { txt, importance } = filterByToEdit
    return (
        <section className="todo-filter">
            <h2>Filter Todos</h2>
            <form onSubmit={onSubmitFilter}>
                <input value={txt} onChange={handleChange}
                    type="search" placeholder="By Txt" id="txt" name="txt"
                />
                <div>
                    <label htmlFor="importance">Importance: </label>
                    <input value={importance} onChange={handleChange}
                        type="number" placeholder="By Importance" id="importance" name="importance"
                    />
                </div>
                <div>
                    
                    <label htmlFor="todoState">Show:</label>
                    <select name="isDone" id="todoState" onChange={handleChange}>
                        <option value="">All</option>
                        <option value="false">Active</option>
                        <option value="true">Done</option>
                    </select>
                </div>

                <button hidden>Set Filter</button>
            </form>
        </section>
    )
}