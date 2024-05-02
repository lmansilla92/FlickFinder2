import { useState } from 'react'
import AppContext from './AppContext'

const AppContextProvider = ({children}) => {
    // Storing loggedIn value from localstorage
    const storedLoginValue = localStorage.getItem('loggedIn');
    // search data
    const [data, setData] = useState(null)
    // Setting initial loggedIn value to localStorage by parsing in JSON
    // Parsing in JSON ensures boolean value is not a string
    const [loggedIn, setLoggedIn] = useState(JSON.parse(storedLoginValue));

    // Initializing favorites array
    const [favorites, setFavorites] = useState([])

    return (
        <AppContext.Provider value={{data, setData, loggedIn, setLoggedIn, favorites, setFavorites}}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;