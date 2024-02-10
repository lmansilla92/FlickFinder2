import { useContext } from 'react';
import AppContext from '../utils/AppContext';
import LoginPage from '../pages/LoginPage';
import SearchBar from '../components/SearchBar';

function HomePage() {
    const { loggedIn } = useContext(AppContext);
    return (
        <>
        {loggedIn ? <SearchBar /> : <LoginPage />}
        </>
    )
}

export default HomePage;