import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button, InputAdornment, TextField } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { useRouter } from 'next/router';
import { registerUser } from '../../utils/auth';
import { useAuth } from '../../utils/context/authContext';
import { createCart } from '../../api/cartData';
// import { registerUser } from '../../utils/auth'; // Update with path to registerUser

function RegisterFormClient() {
  const [registerFormData, setRegisterFormData] = useState({
    name: '',
    email: '',
    phoneNumber: null,
  });
  const { user } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  console.log(registerFormData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...registerFormData,
      customerUid: user?.uid,
      isAdmin: false,
    };
    registerUser(payload).then(router.push('/client/profile'));
    await createCart(user?.uid);
  };

  return (
    <>
      <div className="RegisterForm">
        <TextField
          style={{ width: '75%' }}
          id="input-with-icon-textfield"
          label="Full Name"
          name="name"
          value={registerFormData.name}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
        <br />
        <TextField
          style={{ width: '75%' }}
          id="input-with-icon-textfield"
          label="Email"
          name="email"
          value={registerFormData.email}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
        <br />
        <TextField
          style={{ width: '75%' }}
          required
          id="filled-number"
          type="number"
          label="Phone"
          name="phoneNumber"
          value={registerFormData.phoneNumber}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocalPhoneIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
        <br />
      </div>
      <Button
        variant="contained"
        className="SignUpBtn"
        onClick={handleSubmit}
      > Sign Up
      </Button>
    </>

  );
}

RegisterFormClient.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phoneNumber: PropTypes.number.isRequired,
  }).isRequired,
};

export default RegisterFormClient;
