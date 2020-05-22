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
 * User reset password confirmation dialog component
 * @param {Object} record user data object
 * @param {boolean} resetPasswordDialogOpen dialog open/close state
 * @param {function} setResetPasswordDialogOpen open/close handler function
 */
export const UserResetPasswordDialog = ({
  record,
  resetPasswordDialogOpen,
  setResetPasswordDialogOpen,
}) => {
  let auth = service.getAuthentication();
  let userEmail = record.email;
  const { enqueueSnackbar } = useSnackbar();

  /**
   * handle sending reset password to a user action
   */
  const handleResetPassword = () => {
    auth.resetPassword(
      userEmail,
      () => {
        enqueueSnackbar('Reset password email successfully sent.', {
          variant: 'success',
        });
        setResetPasswordDialogOpen(false);
      },
      () => {
        enqueueSnackbar('Failed to send reset password email.', {
          variant: 'error',
        });
        setResetPasswordDialogOpen(false);
      },
    );
  };

  return (
    <div>
      <Dialog
        open={resetPasswordDialogOpen}
        maxWidth={'sm'}
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Reset Password</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Send password reset email to <b>{userEmail}</b>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setResetPasswordDialogOpen(false);
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={handleResetPassword} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
