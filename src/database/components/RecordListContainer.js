import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export const RecordListContainer = (props) => {
  const headers = ['Last Name', 'First Name', 'Address', 'City'];

  const handleRecordRowClicked = (recordId) => {
    props.setRecordListClicked(recordId);
    props.handleDialogOpen();
  };

  return (
    <TableContainer component={Paper}>
      <Table className="recordsTable">
        <TableHead>
          {headers.map((header) => {
            return (
              <TableCell>
                <Typography>{header}</Typography>
              </TableCell>
            );
          })}
        </TableHead>
        <TableBody>
          {props.records.map((record) => {
            return (
              <TableRow
                className="recordTableRow"
                key={record.id}
                onClick={handleRecordRowClicked.bind(this, record.id)}
              >
                <TableCell>
                  <Typography>{record.lastName}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{record.firstName}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{record.address}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{record.city}</Typography>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
