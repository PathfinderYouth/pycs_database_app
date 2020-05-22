/**
 * Comparator function for sorting
 * @param {array} a first array
 * @param {array} b second array
 * @param {string} orderBy header to order results by
 */
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

/**
 * Handler to switch sorting comparators
 * @param {string} order current order - asc or desc
 * @param {string} orderBy header to order by
 */
export const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

/**
 * Sorting function
 * @param {array} array array to sort
 * @param {function} comparator function to sort with
 */
export const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};
