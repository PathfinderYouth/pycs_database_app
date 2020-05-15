import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import './style/SortingTableHead.css';

export const SortingTableHead = (props) => {
  const { order, orderBy, onRequestSort, headerCells } = props;
  const createSortHandler = (property, queryProperty) => (event) => {
    onRequestSort(event, property, queryProperty);
  };

  return (
    <TableHead>
      <TableRow>
        {headerCells.map((headCell) => {
          const { id, queryId, label } = headCell;
          const isOrderBy = orderBy === id;
          return (
            <TableCell
              key={id}
              align="left"
              padding="default"
              sortDirection={isOrderBy ? order : false}
            >
              <TableSortLabel
                active={isOrderBy}
                direction={isOrderBy ? order : 'asc'}
                onClick={createSortHandler(id, queryId)}
              >
                {label}
                {isOrderBy && (
                  <span className="visuallyHidden">
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                )}
              </TableSortLabel>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};
