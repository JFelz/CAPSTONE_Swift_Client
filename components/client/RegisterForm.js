// import PropTypes from 'prop-types';
// import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import { Button, InputAdornment, TextField } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
// import { registerUser } from '../../utils/auth'; // Update with path to registerUser

function RegisterForm() {
  // const [formData, setFormData] = useState({
  //   bio: '',
  //   uid: user.uid,
  // });

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   registerUser(formData).then(() => updateUser(user.uid));
  // };

  return (
    <>
      <div className="RegisterForm">
        <TextField
          style={{ width: '75%' }}
          id="input-with-icon-textfield"
          label="Full Name"
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
          id="standard-required"
          label="Required"
          defaultValue="Hello World"
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
      > Sign Up
      </Button>
    </>

  );
}

// RegisterForm.propTypes = {
//   user: PropTypes.shape({
//     uid: PropTypes.string.isRequired,
//   }).isRequired,
//   updateUser: PropTypes.func.isRequired,
// };

export default RegisterForm;
