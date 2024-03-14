import logo from './argentBankLogo.png'
import './navigation.css'
import { Link } from 'react-router-dom'

function Navigation() {
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
        <div>
        <Link className="main-nav-item" to="/login">
          <i class="fa fa-user-circle"></i>
          Sign In
        </Link>
        </div>
    </nav>
  );
}

export default Navigation;