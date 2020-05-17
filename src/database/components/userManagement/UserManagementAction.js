import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../sign-in';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export const UserManagementAction = ({ row }) => {
  const { currentUser } = useContext(AuthContext);
  
  return (
    <>
      <Tooltip title="Edit user" aria-label="edit" placement="bottom">
        <IconButton color="inherit" size="small">
          <EditIcon />
        </IconButton>
      </Tooltip>
      {row['email'] !== currentUser.email && (
        <>
          <Tooltip title="Delete user" aria-label="delete" placement="bottom">
            <IconButton color="inherit" size="small">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    </>
  );
};
