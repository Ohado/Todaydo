import { utilService } from "../services/util.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { getUserById, updateUser, getLoggedinUser } from '../store/actions/user.actions.js'
import { styleService } from "../services/style.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function UserDetails() {

    const [user, setUser] = useState(null)
    const [editMode, setEditMode] = useState(false)
    
    const loggedUser = getLoggedinUser()
    const params = useParams()
    const navigate = useNavigate()
    const d = new Date(0);

    useEffect(() => {
        loadUserDetails()
    }, [params.todoId])


    function loadUserDetails() {
        getUserById(params.userId)
            .then((user) => {
                setUser(user);
                document.title = user.fullname
            })
            .catch(err => {
                console.error('err:', err)
                showErrorMsg('Cannot load user details')
                navigate('/user')
            })
    }

    function onClickEditButton() {
        if(editMode) {
            console.log('saving user')
            console.log(user)
            updateUser(user)
            .then((savedUser) => {
                styleService.updateStyle(savedUser.prefs)
                showSuccessMsg(`Details saved`)
            })
            .catch(err => {
                showErrorMsg('Cannot save details')
                console.log('err:', err)
            })
        }
        setEditMode(!editMode)
    }

    function handleChange({ target }) {
        console.log(target)
        const field = target.name
        let value = target.value
        
        switch (target.type) {
            default:
                break
        }
            
        setUser(prevUser => ({ ...prevUser, prefs: {...prevUser.prefs, [field]: value} }))
        console.log(user)
    }

    if (!user) return <div>Loading...</div>

    return (
        <section className="user-details">
            {editMode ? 
                <input className="fullname" name="fullname" type="text" value={user.fullname} onChange={handleChange} required />
                : 
                <h1>{user.fullname}</h1>
            }
            <img src="..\assets\img\user.png" alt="user image" />
            <h2>A user since {utilService.millisecondsToDateString(user.createdAt)}</h2>
            {loggedUser && loggedUser._id === user._id &&
                <div>
                    <div className="edit-colors">
                        <h3>My colors:</h3>
                        <div>
                            <label htmlFor="text-color">Text: </label>
                            {editMode ? <input type="color" name="textColor" id="text-color" className="btn color-sample" value={user.prefs.textColor} onChange={handleChange}/>
                                :   <div className="color-sample" style={{'background-color':(user.prefs.textColor)}}></div>}
                        </div>
                        <div>
                            <label htmlFor="background-color">Background: </label>
                            {editMode ? <input type="color" name="backgroundColor" id="background-color" className="btn color-sample" value={user.prefs.backgroundColor } onChange={handleChange}/>
                                :   <div className="color-sample" style={{'background-color':user.prefs.backgroundColor}}></div>}
                        </div>
                    </div>
                    <button onClick={onClickEditButton}>
                        {!editMode ? 'Edit My Details' : 'save'} 
                    </button>
                </div>}
            
        </section>
    )
}