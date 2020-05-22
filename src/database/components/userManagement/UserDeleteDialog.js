import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSnackbar } from 'notistack';
import service from '../../../facade/service';

/**
 * User delete confirmation dialog component
 * @param {Object} record user data object
 * @param {boolean} deleteDialogOpen dialog open/close state
 * @param {function} setDeleteDialogOpen open/close handler function
 */
export const UserDeleteDialog = ({ record, deleteDialogOpen, setDeleteDialogOpen }) => {
  let db = service.getUserList();
  let userName = record.name;
  const { enqueueSnackbar } = useSnackbar();

  /**
   * handle deleting user action
   */
  const handleDeleteUser = () => {
    db.deleteUser(
      record,
      () => {
        enqueueSnackbar('User successfully deleted.', {
          variant: 'success',
        });
      },
      () => {
        enqueueSnackbar('Failed to delete user.', {
          variant: 'error',
        });
        setDeleteDialogOpen(false);
      },
    );
  };

  return (
    <div>
      <Dialog
        open={deleteDialogOpen}
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
