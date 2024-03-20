import Account from '../../components/account';
import UserHeader from '../../components/userHeader';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


function User() {

    const isLoggedIn = useSelector((state) => state.isLoggedIn);


return (
    <main className="main bg-dark">
        {isLoggedIn ? (  
        <div>    
            <UserHeader />
            <h2 className="sr-only">Accounts</h2>
                <Account
                title="Argent Bank Checking (x8349)"
                amount="$2,082.79"
                description="Available Balance"
                />
                <Account
                title="Argent Bank Savings (x6712)"
                amount="$10,928.42"
                description="Available Balance"
                />
                <Account
                title="Argent Bank Credit Card (x8349)"
                amount="$184.30"
                description="Current Balance"
                />
            </div>  
            ) : (
                <div className="redirection_wrapper">
               <h1 className="redirection_text">
                Please sign in to see your personal page.
               </h1>
               <Link className="redirection_link" to="/login">
                  <h2>&#8594;</h2>
                  <h2 className="signin_text">Sign In</h2>
                  <h2>&#8592;</h2>
               </Link>
            </div>
                )}

    </main>
  );
}

export default User;