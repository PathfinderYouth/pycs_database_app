import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import './style/SortingTableHead.css';
import { inject, observer } from 'mobx-react';
import { uiStore } from '../../injectables';

export const SortingTableHead = inject('uiStore')(
  observer(({ order, orderBy, onRequestSort, headerCells }) => {
    const { currentSearchField, recordSearchBoxActive } = uiStore;
    const createSortHandler = (property, queryProperty) => (event) => {
      onRequestSort(event, property, queryProperty);
    };

    return (
      <TableHead>
        <TableRow>
          {headerCells.map((headCell) => {
            const { id, queryId, label, sortable } = headCell;
            const isOrderBy = orderBy === id;
            const enableSort =
              sortable && (recordSearchBoxActive ? queryId === currentSearchField : true);
            return (
              <TableCell
                key={id}
                align="left"
                padding="default"
                sortDirection={isOrderBy ? order : false}
              >
                {enableSort ? (
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
                ) : (
                  <span>{label}</span>
                )}
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
    );
  }),
);
