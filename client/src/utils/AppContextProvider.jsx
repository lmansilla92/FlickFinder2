import { useState } from 'react'
import AppContext from './AppContext'

const AppContextProvider = ({children}) => {
    // Storing loggedIn value from localstorage
    const storedValue = localStorage.getItem('loggedIn');
    const [data, setData] = useState(null)
    // Setting initla loggedIn value to localStorage by parsing in JSON
    // Parsing in JSON ensures boolean value is not a string
    const [loggedIn, setLoggedIn] = useState(JSON.parse(storedValue));
    console.log('appcontext loggedIn:', loggedIn);

    return (
        <AppContext.Provider value={{data, setData, loggedIn, setLoggedIn}}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;