import Navigation from '../../components/navigation';
import Footer from '../../components/footer';
import SignInForm from '../../components/signInForm';

function SignIn() {

return (
    <div>
        <Navigation />
        <main className='main bg-dark'>
        <SignInForm />
        </main>
        <Footer/>
    </div>
  );
}

export default SignIn;