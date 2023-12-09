// import PropTypes from 'prop-types';
// import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import { InputAdornment, TextField } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
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
      <TextField
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
      <TextField
        id="input-with-icon-textfield"
        label="Email"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
      <TextField
        id="input-with-icon-textfield"
        label="Phone Number"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
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
