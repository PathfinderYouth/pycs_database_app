import React, { useEffect, useState } from 'react';
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

const StaffSearchSelect = ({ handleChange }) => {
  const options = uiStore.staffSearchFilters;
  return (
    <Select
      className="formControl"
      defaultValue={options[0].id}
      onChange={handleChange}
      disableUnderline
    >
      {options.map((option) => {
        const { id, label } = option;
        return (
          <MenuItem value={id} key={id}>
            {label}
          </MenuItem>
        );
      })}
    </Select>
  );
};

const ParticipantSearchSelect = ({ handleChange }) => {
  const options = uiStore.participantSearchFilters;
  return (
    <Select
      className="formControl"
      defaultValue={options[0].id}
      onChange={handleChange}
      disableUnderline
    >
      {options.map((option) => {
        const { id, label } = option;
        return (
          <MenuItem value={id} key={id}>
            {label}
          </MenuItem>
        );
      })}
    </Select>
  );
};

export const RecordSearchBar = inject('uiStore')(
  observer((props) => {
    const { currentViewMode, viewModes } = uiStore;
    const classes = useStyles();
    const { title, headers, onSearchClicked } = props;
    const [searchBy, setSearchBy] = useState(headers[0].id);
    const [searchText, setSearchText] = useState('');

    //Updates current search by field when view is changed
    useEffect(() => {
      setSearchBy(headers[0].id);
    }, [headers, currentViewMode]);

    const handleChange = (event) => {
      setSearchBy(event.target.value);
    };

    const getSearchText = (event) => {
      setSearchText(event.target.value);
    };

    const onKeyPressed = (event) => {
      if (event.key === 'Enter') {
        onSubmit();
      }
    };

    const onSubmit = () => {
      onSearchClicked(searchBy, searchText);
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
                    {currentViewMode === viewModes.STAFF_LIST ? (
                      <StaffSearchSelect handleChange={handleChange} />
                    ) : (
                      <ParticipantSearchSelect handleChange={handleChange} />
                    )}
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
