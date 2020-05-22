import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../sign-in';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { UserDeleteDialog } from './UserDeleteDialog';
import { UserResetPasswordDialog } from './UserResetPasswordDialog';
import { UserDialog } from './UserDialog';

/**
 * component of user management actions
 * @param {Object} row
 * a user record from user collection
 */
export const UserManagementAction = ({ row }) => {
  const { currentUser } = useContext(AuthContext);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [resetPasswordDialogOpen, setResetPasswordDialogOpen] = useState(false);
  const isCurrentUser = !!currentUser && row.email === currentUser.email;

  return (
    <>
      <Tooltip title="Edit user" aria-label="edit" placement="bottom">
        <IconButton size="small" onClick={() => setEditDialogOpen(true)}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Send reset password email" aria-label="reset" placement="bottom">
        <IconButton size="small" onClick={() => setResetPasswordDialogOpen(true)}>
          <VpnKeyIcon />
        </IconButton>
      </Tooltip>
      {!isCurrentUser && (
        <>
          <Tooltip title="Delete user" aria-label="delete" placement="bottom">
            <IconButton size="small" onClick={() => setDeleteDialogOpen(true)}>
              <DeleteIcon color="error" />
            </IconButton>
          </Tooltip>
        </>
      )}
      <UserDeleteDialog
        record={row}
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
      />
      <UserDialog
        user={row}
        isCurrentUser={isCurrentUser}
        open={editDialogOpen}
        setOpen={setEditDialogOpen}
      />
      <UserResetPasswordDialog
        record={row}
        resetPasswordDialogOpen={resetPasswordDialogOpen}
        setResetPasswordDialogOpen={setResetPasswordDialogOpen}
      />
    </>
  );
};
