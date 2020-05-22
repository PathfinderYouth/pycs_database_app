import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../sign-in';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { UserDeleteDialog } from './UserDeleteDialog';
import { UserEditDialog } from './UserEditDialog';
import { UserResetPasswordDialog } from './UserResetPasswordDialog';

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
      {currentUser !== null && row.email !== currentUser.email && (
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
      <UserEditDialog
        record={row}
        currentUser={currentUser}
        editDialogOpen={editDialogOpen}
        setEditDialogOpen={setEditDialogOpen}
      />
      <UserResetPasswordDialog
        record={row}
        resetPasswordDialogOpen={resetPasswordDialogOpen}
        setResetPasswordDialogOpen={setResetPasswordDialogOpen}
      />
    </>
  );
};
