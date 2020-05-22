import React from 'react';
import { inject, observer } from 'mobx-react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Search from '@material-ui/icons/Search';
import { uiStore } from '../../../injectables';
import '../style/RecordSearchBar.css';

const useStyles = makeStyles((theme) => ({
  root: { padding: theme.spacing(2) },
  button: { marginLeft: theme.spacing(1) },
}));

/**
 * Search bar with dropdown select component
 * @param {function} handleChange onChange handler function
 * @param {string} searchField search field value
 * @param {array} options list of select options
 */
const SearchSelect = ({ handleChange, searchField, options }) => {
  return (
    <Select className="formControl" onChange={handleChange} value={searchField} disableUnderline>
      {options.map((option) => {
        const { id, queryId, label } = option;
        return (
          <MenuItem value={queryId} key={id}>
            {label}
          </MenuItem>
        );
      })}
    </Select>
  );
};

/**
 * Wrapper component for SearchSelect including a page title
 * @param {string} title title of the table
 * @param {function} onSearchClicked click event to initiate searches
 */
export const RecordSearchBar = inject('uiStore')(
  observer(({ title, onSearchClicked }) => {
    const {
      filters,
      currentSearchField,
      setCurrentSearchField,
      currentSearchText,
      setCurrentSearchText,
    } = uiStore;
    const classes = useStyles();

    /**
     * OnChange event handler
     * @param {Event} event onChange event
     */
    const handleChange = (event) => {
      setCurrentSearchField(event.target.value);
    };

    /**
     * Handler to get search text from search bar on click
     * @param {Event} event onClick event
     */
    const getSearchText = (event) => {
      setCurrentSearchText(event.target.value);
    };

    /**
     * KeyPressed event handler
     * @param {Event} event onKeyPressed event
     */
    const onKeyPressed = (event) => {
      if (event.key === 'Enter') {
        onSubmit();
      }
    };

    /**
     * Submit handler for the search bar
     */
    const onSubmit = () => {
      onSearchClicked(currentSearchField, currentSearchText.toLowerCase());
    };

    return (
      <div className={`${classes.root} searchBar`}>
        <Typography variant="h6" className="title">
          {title}
        </Typography>
        <TextField
          className="searchBox"
          variant="outlined"
          size="small"
          onChange={getSearchText}
          onKeyPress={onKeyPressed}
          value={currentSearchText}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <div className="endAdorn">
                  <FormControl className="formControl">
                    <SearchSelect
                      handleChange={handleChange}
                      searchField={currentSearchField}
                      options={filters}
                    />
                  </FormControl>
                </div>
              </InputAdornment>
            ),
          }}
        />
        <Button className={classes.button} variant="contained" color="primary" onClick={onSubmit}>
          Search
        </Button>
      </div>
    );
  }),
);
