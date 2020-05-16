import React from 'react';
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

export const CreateUserDialog = (
  addStaffOpen,
  setAddStaffOpen,
  handleEmailChange,
  handleNameChange,
  handleRoleChange,
  handleAddNewUser,
  handleAddDialogClose,
  role
  ) => {
  return (
    <Dialog open={addStaffOpen} onClose={setAddStaffOpen} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Create a new user</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>
                Please enter the user's email, name and role here.
              </DialogContentText> */}
        <TextField
          autoFocus
          required
          margin="dense"
          id="email"
          label="Email"
          type="email"
          size="medium"
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
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={'staff'}>Staff</MenuItem>
            <MenuItem value={'admin'}>Admin</MenuItem>
          </Select>
          {/* <FormHelperText>Required</FormHelperText> */}
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddNewUser} color="primary">
          Create
        </Button>
        <Button onClick={handleAddDialogClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
