import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

/**
 * Dialog that opens when the user has been idle
 * @param {boolean} isOpen whether dialog is open
 * @param {function} setIdleDialogOpen function to open/close dialog
 */
export const IdleDialog = ({ isOpen, setIdleDialogOpen }) => {
  return (
    <Dialog open={isOpen}>
      <DialogTitle>Are you still there?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You've been inactive for 10 minutes. If you don't resume activity within the next 10
          minutes, you will be logged out.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIdleDialogOpen(false)}>Resume</Button>
      </DialogActions>
    </Dialog>
  );
};
