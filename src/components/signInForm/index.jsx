import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../app/store';
import { useSelector } from 'react-redux';
import './signInForm.css'


function SignInForm() {
  const hasLoginFailed = useSelector((state) => state.hasLoginFailed);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
     <main className="main bg-dark">
        <section className="sign-in-content">
           <i className="fa fa-user-circle sign-in-icon"></i>
           <h1>Sign In</h1>
           <form>
              <div className="input-wrapper">
                 <label htmlFor="email">E-mail</label>
                 <input type="text" id="email" />
              </div>
              <div className="input-wrapper">
                 <label htmlFor="password">Password</label>
                 <input type="password" id="password" autoComplete="off" />
              </div>
              <div className="input-remember">
                 <input type="checkbox" id="remember" />
                 <label htmlFor="remember">Remember me</label>
              </div>
              {hasLoginFailed ? (
                 <div className="error_message">
                    Wrong e-mail or password, please check again.
                 </div>
              ) : (
                 ''
              )}
              <button
         className="sign-in-button"
         onClick={(e) => {
            e.preventDefault();
            dispatch(login(navigate));
         }}
      >
         Sign In
      </button>
           </form>
        </section>
     </main>
  );
}

export default SignInForm;