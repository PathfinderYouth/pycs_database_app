import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../sign-in';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { UserDeleteDialog } from './UserDeleteDialog';
import { UserEditDialog } from './UserEditDialog';

export const UserManagementAction = ({ row }) => {
  let selectedUser = { email: row.email, name: row.name, role: row.role };
  const { currentUser } = useContext(AuthContext);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  return (
    <>
      <Tooltip title="Edit user" aria-label="edit" placement="bottom">
        <IconButton color="inherit" size="small" onClick={() => setEditDialogOpen(true)}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      {row['email'] !== currentUser.email && (
        <>
          <Tooltip title="Delete user" aria-label="delete" placement="bottom">
            <IconButton color="inherit" size="small" onClick={() => setDeleteDialogOpen(true)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
      <UserDeleteDialog
        user={selectedUser}
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
      />
      <UserEditDialog 
        user={selectedUser}
        editDialogOpen={editDialogOpen}
        setEditDialogOpen={setEditDialogOpen}
      />
    </>
  );
};