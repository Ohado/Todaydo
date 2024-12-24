const { useEffect, useState } = React
const { Link, NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter
const { useSelector } = ReactRedux

import { UserMsg } from "./UserMsg.jsx"
import { LoginSignup } from './LoginSignup.jsx'
import { showErrorMsg } from '../services/event-bus.service.js'
import { login, logout } from '../store/actions/user.actions.js'
import { styleService } from "../services/style.service.js"

export function AppHeader() {
    const navigate = useNavigate()

    const user = useSelector(storeState => storeState.userModule.loggedUser)
    
    function onLogout() {
        logout()
        .catch((err) => showErrorMsg(`Can't log out! Please try again later`))
    }

    function onSetUser(user) {
        login(user)
        styleService.updateStyle(user.prefs)
        navigate('/')
    }
    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>React Todo App</h1>
                {user ? (
                    < section className='user-data'>

                        <Link to={`/user/${user._id}`}>Hello {user.fullname}</Link>
                        <div>Your balance is {user.balance}</div>
                        <button onClick={onLogout}>Logout</button>
                    </ section >
                ) : (
                    <section>
                        <LoginSignup onSetUser={onSetUser} />
                    </section>
                )}
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/todo" >Todos</NavLink>
                    <NavLink to="/dashboard" >Dashboard</NavLink>
                </nav>
            </section>
            <UserMsg />
        </header>
    )
}


