import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
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
          variant="outlined"
          margin="normal"
          id="email"
          label="Email"
          type="email"
          size="medium"
          error={errorEmailEmpty}
          helperText={errorEmailEmpty && 'Field cannot be empty'}
          onChange={handleEmailChange}
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
          onChange={handleNameChange}
          fullWidth
        />

        <TextField
          required
          id="role"
          label="Role"
          variant="outlined"
          value={role}
          onChange={handleRoleChange}
          fullWidth
          select
        >
          <MenuItem value={userRole.STAFF}>Staff</MenuItem>
          <MenuItem value={userRole.ADMIN}>Admin</MenuItem>
        </TextField>
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
