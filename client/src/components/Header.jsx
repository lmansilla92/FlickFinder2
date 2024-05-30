import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import AppContext from '../utils/AppContext';
import LogoutButton from '../components/LogoutButton';
import Auth from '../utils/auth';

const Header = () => {
  const { loggedIn } = useContext(AppContext) // not being used currently 
  const isLoggedIn = Auth.loggedIn(); // being used 
  console.log('isLoggedIn: ', isLoggedIn);
  console.log('loggedIn', loggedIn);
  return (
    <nav className="header">
      <Link to="/" className="logo">
        <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Logo" />
      </Link>
      <div className="navbar-links">
        {isLoggedIn && <LogoutButton />}

        {isLoggedIn && <Link to="/profile">View Profile</Link>}
      </div>
    </nav>
  );
};

export default Header;