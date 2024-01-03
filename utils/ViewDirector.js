import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useAuth } from './context/authContext';
import Loading from '../components/client/Loading';
import Signin from '../components/client/Signin';
import NavBar from '../components/client/NavBar';
import RegisterForm from '../components/client/RegisterForm';
import FooterPage from '../components/client/Footer';
import AdminNavBarAuth from '../components/admin/AdminNavBar';
import { returnUserUID } from '../api/userData';

const ViewDirectorBasedOnUserAuthStatus = ({ component: Component, pageProps }) => {
  const { user, userLoading, updateUser } = useAuth();
  const [validCashier, setValidCashier] = useState();

  const checkingUser = () => {
    returnUserUID(user?.uid).then(setValidCashier);
    console.log('VC', validCashier);
  };

  useEffect(() => {
    checkingUser();
  }, []);

  // if user state is null, then show loader
  if (userLoading) {
    console.log('Firebase User is not coming through the ViewDirector');
    return <Loading />;
  }
  // what the user should see if they are logged in
  if (user) {
    return (
      <>
        <NavBar /> {/* NavBar only visible if user is logged in and is in every view */}
        <div className="container">{'valid' in user ? <RegisterForm user={user} updateUser={updateUser} /> : <Component {...pageProps} />}</div>
        <FooterPage />
      </>
    );
  }

  return <Signin />;
};

export default ViewDirectorBasedOnUserAuthStatus;

ViewDirectorBasedOnUserAuthStatus.propTypes = {
  component: PropTypes.func.isRequired,
  pageProps: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
