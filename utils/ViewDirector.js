import PropTypes from 'prop-types';
import { useAuth } from './context/authContext';
import Loading from '../components/client/Loading';
import Signin from '../components/client/Signin';
import NavBar from '../components/client/NavBar';
import RegisterForm from '../components/client/RegisterForm';
import AdminNavBarAuth from '../components/admin/AdminNavBar';

const ViewDirectorBasedOnUserAuthStatus = ({ component: Component, pageProps }) => {
  const { user, userLoading, updateUser } = useAuth();

  console.log(user);
  // if user state is null, then show loader
  if (userLoading) {
    console.log('Firebase User is not coming through the ViewDirector')
    return <Loading />;
  }

  // what the user should see if they are logged in
  if (user.isAdmin === true) {
    return (
      <>
        <AdminNavBarAuth />
        <div className="container">{'valid' in user ? <RegisterForm user={user} updateUser={updateUser} /> : <Component {...pageProps} />} </div>
      </>
    );
  }

  if (user.isAdmin === false) {
    return (
      <>
        <NavBar /> {/* NavBar only visible if user is logged in and is in every view */}
        <div className="container">{'valid' in user ? <RegisterForm user={user} updateUser={updateUser} /> : <Component {...pageProps} />}</div>
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
