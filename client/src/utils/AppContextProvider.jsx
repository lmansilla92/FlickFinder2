import { useState } from 'react'
import AppContext from './AppContext'

const AppContextProvider = ({children}) => {
    // Storing loggedIn value from localstorage
    const storedValue = localStorage.getItem('loggedIn');
    const [data, setData] = useState(null)
    // Setting initial loggedIn value to localStorage by parsing in JSON
    // Parsing in JSON ensures boolean value is not a string
    const [loggedIn, setLoggedIn] = useState(JSON.parse(storedValue));
    const [favorite, setFavorite] = useState(null)
    console.log('appcontext loggedIn:', loggedIn);

    return (
        <AppContext.Provider value={{data, setData, loggedIn, setLoggedIn, favorite, setFavorite}}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;