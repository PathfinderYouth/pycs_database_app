import React from 'react';
import { inject, observer } from 'mobx-react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { uiStore } from '../../../injectables';
import '../style/SortingTableHead.css';

/**
 * Sorting table header component
 * @param {string} order previous order, asc or desc
 * @param {orderBy} orderBy header to order by
 * @param {function} onRequestSort sorting change handler function
 * @param {array} headerCells list of header cells
 */
export const SortingTableHead = inject('uiStore')(
  observer(({ order, orderBy, onRequestSort, headerCells }) => {
    const { currentSearchField, recordSearchBoxActive } = uiStore;

    /**
     * Sort handler function
     * @param {string} property previous sort
     * @param {string} queryProperty new sort
     */
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
