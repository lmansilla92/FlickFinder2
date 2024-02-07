import React, { useContext } from 'react';
import Auth from '../utils/auth';
import AppContext from '../utils/AppContext'

const LogoutButton = () => {
    const {setLoggedIn} = useContext(AppContext)
    const handleLogout = () => {
        setLoggedIn(false);
        localStorage.setItem('loggedIn', false);
        Auth.logout();
    }

    return (
        <a className='navbar-links a' onClick={handleLogout}>Logout</a>
    )
}

export default LogoutButton;