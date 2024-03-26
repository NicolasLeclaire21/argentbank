import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';import { logout } from '../../store/store';
import logo from './argentBankLogo.jpg'
import './navigation.css'
import { Link } from 'react-router-dom'

function Navigation() {
  const userName = useSelector((state) => state.auth.userName);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const dispatch = useDispatch();


  return (
    <header className="main-nav">
        <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
        </Link>
        {isLoggedIn ? (
            <nav className="nav">
               <Link className="main-nav-item" to="/profile">
                  <i className="fa fa-user-circle"></i>
                  {userName}
               </Link>
               <Link
                  className="main-nav-item"
                  to="/"
                  onClick={() => {
                      dispatch(logout());
                  }}
                >
                  <i className="fa fa-sign-out"></i>
                  Sign Out
              </Link>
            </nav>
        ) : (
        <div>
        <Link className="main-nav-item" to="/login">
          <i class="fa fa-user-circle"></i>
          Sign In
        </Link>
        </div>
        )}
    </header>
  );
}

export default Navigation;