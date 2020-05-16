import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Search from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import './style/RecordSearchBar.css';
import Button from '@material-ui/core/Button';
import { inject, observer } from 'mobx-react';
import { uiStore } from '../../injectables';

const useStyles = makeStyles((theme) => ({
  root: { padding: theme.spacing(2) },
  button: { marginLeft: theme.spacing(1) },
}));

const SearchSelect = ({ handleChange, searchField, options }) => {
  return (
    <Select
      className="formControl"
      onChange={handleChange}
      value={searchField}
      disableUnderline
    >
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

export const RecordSearchBar = inject('uiStore')(
  observer((props) => {
    const {
      filters,
      currentSearchField,
      setCurrentSearchField,
      currentSearchText,
      setCurrentSearchText,
    } = uiStore;
    const classes = useStyles();
    const { title, onSearchClicked } = props;

    const handleChange = (event) => {
      setCurrentSearchField(event.target.value);
    };

    const getSearchText = (event) => {
      setCurrentSearchText(event.target.value);
    };

    const onKeyPressed = (event) => {
      if (event.key === 'Enter') {
        onSubmit();
      }
    };

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
