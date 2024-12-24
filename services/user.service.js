import { storageService } from "./async-storage.service.js"

// const user = {
//     _id: "KAtTl",
//     username: "muki",
//     password: "muki1",
//     fullname: "Muki Ja",
//     createdAt: 1711490430252,
//     updatedAt: 1711490430999,
//     balance: 10000, 
//     activities: [{txt: 'Added a Todo', at: 1523873242735}]
// }

export const userService = {
    getLoggedinUser,
    login,
    logout,
    signup,
    getById,
    query,
    getEmptyCredentials,
    setBalance,
}
const STORAGE_KEY_LOGGEDIN = 'user'
const STORAGE_KEY = 'userDB'

function query() {
    return storageService.query(STORAGE_KEY)
}

function getById(userId) {
    return storageService.get(STORAGE_KEY, userId)
}

function login({ username, password }) {
    return storageService.query(STORAGE_KEY)
        .then(users => {
            const user = users.find(user => user.username === username)
            if (user) return _setLoggedinUser(user)
            else return Promise.reject('Invalid login')
        })
}

function signup({ username, password, fullname, balance, }) {
    const user = { username, password, fullname, balance, }
    user.createdAt = user.updatedAt = Date.now()
    user.activities = [{txt: 'User Created', at: user.createdAt}]
    user.balance = 0
    console.log(user)

    return storageService.post(STORAGE_KEY, user)
        .then(_setLoggedinUser)
}

function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    return Promise.resolve()
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function setBalance(user, newBalance, Adidas="just thought it's funny") {
    _ChangeUser({...user, balance:newBalance})
}

function _ChangeUser(user) {
    if (user._id) {
        // TODO - updatable fields
        user.updatedAt = Date.now()
        return storageService.put(STORAGE_KEY, user)
    } else {
        todo.createdAt = todo.updatedAt = Date.now()
        return storageService.post(STORAGE_KEY, user)
    }
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, balance: user.balance }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

function getEmptyCredentials() {
    return {
        fullname: '',
        username: '',
        password: '',
        balance: 0,
        activities: []
    }
}

// signup({username: 'muki', password: 'muki1', fullname: 'Muki Ja'})
// login({username: 'muki', password: 'muki1'})

// Data Model:
// const user = {
//     _id: "KAtTl",
//     username: "muki",
//     password: "muki1",
//     fullname: "Muki Ja",
//     createdAt: 1711490430252,
//     updatedAt: 1711490430999
// }