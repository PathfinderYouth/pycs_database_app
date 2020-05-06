import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { TablePagination } from '@material-ui/core';
import { SortingTableHead } from './SortingTableHead';
import { stableSort, getComparator } from './sortingHelpers';

const headers = [
  { id: 'status', label: 'Status' },
  { id: 'lastName', label: 'Last Name' },
  { id: 'firstName', label: 'First Name' },
  { id: 'birthDate', label: 'Date of Birth' },
  { id: 'address', label: 'Address' },
  { id: 'city', label: 'City' },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
}));

export const RecordListContainer = (props) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('lastName');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const rows = props.records;

  const handleRecordRowClicked = (clickedRecord) => {
    props.setRecordListClicked(clickedRecord);
    props.handleDialogOpen();
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    //TODO
  };

  const handleChangeRowsPerPage = (event) => {
    //TODO
  };

  const handleClick = (event, name) => {
    //TODO
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table className={classes.table} size="medium">
            <SortingTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headerCells={headers}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage,
                )
                .map((record, index) => {
                  const {
                    id,
                    lastName,
                    firstName,
                    address,
                    city,
                    status,
                    birthDate,
                  } = record;
                  return (
                    <TableRow
                      hover
                      onClick={handleRecordRowClicked.bind(
                        this,
                        record,
                      )}
                      tabIndex={-1}
                      key={id}
                    >
                      <TableCell>
                        <Typography>{status}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{lastName}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{firstName}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{birthDate}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{address}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{city}</Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[20, 50, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};
