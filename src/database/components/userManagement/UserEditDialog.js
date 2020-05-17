import React, { useState } from 'react';
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

export const UserEditDialog = ({ user, editDialogOpen, setEditDialogOpen }) => {
  let db = service.getUserList();
  const { enqueueSnackbar } = useSnackbar();
  let userEmail = user.email;
  const [name, setName] = useState(user.name);
  const [role, setRole] = useState(user.role);
  const [errorNameStatus, setErrorNameStatus] = useState(false);

  const handleEditUser = () => {
    if (name === '') {
      setErrorNameStatus(name === '');
      return;
    }
    //TODO
    setEditDialogOpen(false);
  };

  const handleCancelClick = () => {
    setName(user.name);
    setRole(user.role);
    setErrorNameStatus(false);
    setEditDialogOpen(false);
  };
  return (
    <Dialog
      open={editDialogOpen}
      onClose={() => {
        setEditDialogOpen(false);
      }}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Update a user</DialogTitle>
      <DialogContent>
        <TextField
          required
          InputProps={{
            readOnly: true,
          }}
          disabled
          variant="outlined"
          margin="normal"
          id="email"
          label="Email"
          type="email"
          size="medium"
          value={userEmail}
          fullWidth
        />
        <TextField
          autoFocus
          required
          variant="outlined"
          margin="normal"
          id="name"
          label="Name"
          size="medium"
          value={name}
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
        <Button onClick={handleCancelClick} color="primary">
          Cancel
        </Button>
        <Button onClick={handleEditUser} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};
