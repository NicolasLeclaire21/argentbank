import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './store/store';
import Home from './pages/home/'
import SignIn from './pages/signIn';
import User from './pages/user';
import './index.css';
import Footer from './components/footer';
import Navigation from './components/navigation';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
     <Router>
        <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/profile" element={<User />} />
          </Routes>
        <Footer />
      </Router>
  </Provider>
);