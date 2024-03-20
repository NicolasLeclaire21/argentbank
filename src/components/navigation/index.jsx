import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';import { logoutAction } from '../../app/store';
import logo from './argentBankLogo.png'
import './navigation.css'
import { Link } from 'react-router-dom'

function Navigation() {
  const userName = useSelector((state) => state.auth.userName);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const dispatch = useDispatch();


  return (
    <nav className="main-nav">
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
               <Link className="nav_item" to="/profile">
                  <i className="fa fa-user-circle"></i>
                  <p className="nav_item_text">{userName}</p>
               </Link>
               <Link
                  className="logout_link"
                  to="/"
                  onClick={() => {
                      dispatch(logoutAction());
                  }}
                >
                  <i className="fa fa-sign-out"></i>
                  <p className="logout_link_text">Sign Out</p>
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
    </nav>
  );
}

export default Navigation;