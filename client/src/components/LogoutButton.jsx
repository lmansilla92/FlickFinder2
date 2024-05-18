import Auth from '../utils/auth';

const LogoutButton = () => {
    const handleLogout = () => {
        localStorage.removeItem('loggedIn');
        Auth.logout();
    }

    return (
        <button className='logout a' onClick={handleLogout}>Logout</button>
    )
}

export default LogoutButton;