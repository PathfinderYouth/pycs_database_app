import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { useSnackbar } from 'notistack';
import { userRole } from '../../constants';
import service from '../../facade/service';

export const CreateUserDialog = ({ users, addStaffOpen, setAddStaffOpen }) => {
  let db = service.getUserList();
  let existingUserEmails = [];
  useEffect(() => {
    users.map((user) => (existingUserEmails = [...existingUserEmails, user['email']]));
  });
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState(userRole.STAFF);
  const [errorEmailEmpty, setErrorEmailEmpty] = useState(false);
  const [errorEmailUsed, setErrorEmailUsed] = useState(false);
  const [errorNameStatus, setErrorNameStatus] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleAddDialogClose = () => {
    setAddStaffOpen(false);
  };

  const handleAddNewUser = () => {
    let isEmailUsed = existingUserEmails.indexOf(email) > -1;
    if (email === '' || isEmailUsed || name === '') {
      setErrorEmailEmpty(email === '');
      setErrorEmailUsed(isEmailUsed);
      setErrorNameStatus(name === '');
      return;
    }
    let newUser = { email: email, name: name, role: role };
    db.addUser(
      newUser,
      () => {
        enqueueSnackbar('New User Created.', {
          variant: 'success',
        });
        setAddStaffOpen(false);
      },
      (error) => {
        enqueueSnackbar(`Cannot create new user, ${error}.`, {
          variant: 'error',
        });
        setAddStaffOpen(false);
      },
    );
  };
  return (
    <Dialog open={addStaffOpen} onClose={setAddStaffOpen} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Create a new user</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          id="email"
          label="Email"
          type="email"
          size="medium"
          error={errorEmailEmpty || errorEmailUsed}
          helperText={
            (errorEmailEmpty && 'Field cannot be empty') ||
            (errorEmailUsed && 'Email already exists')
          }
          onChange={handleEmailChange}
          fullWidth
        />
        <TextField
          required
          margin="dense"
          id="name"
          label="Name"
          type="name"
          size="medium"
          error={errorNameStatus}
          helperText={errorNameStatus && 'Field cannot be empty'}
          onChange={handleNameChange}
          fullWidth
        />
        <FormControl required fullWidth>
          <InputLabel id="demo-simple-select-required-label">Role</InputLabel>
          <Select
            labelId="demo-simple-select-required-label"
            id="demo-simple-select-required"
            value={role}
            onChange={handleRoleChange}
          >
            <MenuItem value={userRole.STAFF}>Staff</MenuItem>
            <MenuItem value={userRole.ADMIN}>Admin</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddDialogClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAddNewUser} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
