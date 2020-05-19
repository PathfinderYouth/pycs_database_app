import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import { useSnackbar } from 'notistack';
import { userRole } from '../../../constants';
import service from '../../../facade/service';
import { MenuItem } from '@material-ui/core';

export const UserCreateDialog = ({ users, addStaffOpen, setAddStaffOpen }) => {
  let db = service.getUserList();
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState(userRole.STAFF);
  const [errorEmailEmpty, setErrorEmailEmpty] = useState(false);
  const [errorNameStatus, setErrorNameStatus] = useState(false);

  const handleAddNewUser = () => {
    if (email === '' || name === '') {
      setErrorEmailEmpty(email === '');
      setErrorNameStatus(name === '');
      return;
    }
    let newUser = { email: email, name: name, role: role };
    db.addUser(
      newUser,
      () => {
        enqueueSnackbar('New user successfully created.', {
          variant: 'success',
        });
        setAddStaffOpen(false);
      },
      () => {
        enqueueSnackbar('Failed to create new user.', {
          variant: 'error',
        });
        setAddStaffOpen(false);
      },
    );
  };
  return (
    <Dialog open={addStaffOpen} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Create User</DialogTitle>
      <DialogContent>
        <DialogContentText>
          In order to finish account creation, the new user must log in using the email address just provided. The 
          password they enter the first time they log in will be the password associated with their account.
        </DialogContentText>
        <TextField
          autoFocus
          required
          variant="outlined"
          margin="normal"
          id="email"
          label="Email"
          type="email"
          size="medium"
          error={errorEmailEmpty}
          helperText={errorEmailEmpty && 'Field cannot be empty'}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          fullWidth
        />
        <TextField
          required
          variant="outlined"
          margin="normal"
          id="name"
          label="Name"
          size="medium"
          error={errorNameStatus}
          helperText={errorNameStatus && 'Field cannot be empty'}
          onChange={(event) => {
            setName(event.target.value);
          }}
          fullWidth
        />

        <TextField
          required
          id="role"
          label="Role"
          variant="outlined"
          value={role}
          onChange={(event) => {
            setRole(event.target.value);
          }}
          fullWidth
          select
        >
          <MenuItem value={userRole.STAFF}>Staff</MenuItem>
          <MenuItem value={userRole.ADMIN}>Admin</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setAddStaffOpen(false);
          }}
          color="primary"
        >
          Cancel
        </Button>
        <Button onClick={handleAddNewUser} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
