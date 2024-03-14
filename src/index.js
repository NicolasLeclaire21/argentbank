import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './app/store';
import Home from './pages/home/'
import SignIn from './pages/signIn';
import User from './pages/user';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
     <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/profile" element={<User />} />
            </Routes>
      </Router>
  </Provider>
);