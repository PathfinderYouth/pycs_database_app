import React, { useState } from 'react';
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
import { getComparator, stableSort } from './sortingHelpers';
import { inject, observer } from 'mobx-react';
import { uiStore } from '../../injectables';
import './style/ListContainer.css';
import { RecordSearchBar } from './RecordSearchBar';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginBottom: theme.spacing(2),
  },
}));

export const ListContainer = inject('uiStore')(
  observer(({ records, setRowClicked }) => {
    const classes = useStyles();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('lastName');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const {
      headers,
      setCurrentViewMode,
      currentDetailViewMode,
      currentViewMode,
      viewModes,
    } = uiStore;

    const pageTitle = currentViewMode === viewModes.PARTICIPANT_LIST ? 'Participants' : 'Staff';

    const handleRowClicked = (clickedRow) => {
      setRowClicked(clickedRow);
      setCurrentViewMode(currentDetailViewMode);
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

    return (
      <div className={`${classes.root} maxWidth`}>
        <Paper className={`${classes.paper} maxWidth`}>
          <RecordSearchBar title={pageTitle} headers={headers} />
          <TableContainer>
            <Table className={classes.table} size="medium">
              <SortingTableHead
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={records.length}
                headerCells={headers}
              />
              <TableBody>
                {stableSort(records, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow hover key={row.id} onClick={handleRowClicked.bind(this, row)}>
                      {headers.map((column) => (
                        <TableCell key={`${row.id}-${column.id}`}>
                          <Typography>{row[column.id]}</Typography>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[20, 50, 100]}
            component="div"
            count={records.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    );
  }),
);
