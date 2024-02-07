import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import AppContext from '../utils/AppContext';
import LogoutButton from '../components/LogoutButton';

const Header = () => {
  const {loggedIn} = useContext(AppContext)
  console.log('loggedIn', loggedIn);
  return (
    <nav className="header">
      <Link to="/" className="logo">
        <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Logo" />
      </Link>
      <div className="navbar-links">
        {!loggedIn ? <Link to="/login">Login</Link> : <LogoutButton />}

        <Link to="/profile">View Profile</Link>
      </div>
    </nav>
  );
};

export default Header;