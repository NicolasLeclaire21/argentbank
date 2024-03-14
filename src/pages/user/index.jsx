import Navigation from '../../components/navigation';
import Footer from '../../components/footer';
import Account from '../../components/account';
import UserHeader from '../../components/userHeader';

function User() {

return (
    <div>
        <Navigation />
        <main className="main bg-dark">
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
        </main>
        <Footer/>
    </div>
  );
}

export default User;