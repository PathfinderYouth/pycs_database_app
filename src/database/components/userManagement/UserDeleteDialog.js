import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import service from '../../../facade/service';

export const UserDeleteDialog = ({ user, deleteDialogOpen, setDeleteDialogOpen }) => {
  let db = service.getUserList();
  let userName = user.name;
  const handleDeleteUser = () => {
    //TODO
    setDeleteDialogOpen(false);
  };

  return (
    <div>
      <Dialog
        open={deleteDialogOpen}
        onClose={setDeleteDialogOpen}
        maxWidth={'sm'}
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete User</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Delete user <b>{userName}</b>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setDeleteDialogOpen(false);
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={handleDeleteUser} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
