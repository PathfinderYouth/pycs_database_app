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

const useStyles = makeStyles((theme) => ({
  root: { padding: theme.spacing(2) },
}));

export const RecordSearchBar = (props) => {
  const classes = useStyles();
  const { title, headers } = props;

  const handleChange = (event) => {
    //TODO use selection for search query
  };

  return (
    <div className={`${classes.root} searchBar`}>
      <Typography variant="h6">{title}</Typography>
      <TextField
        className="searchBox"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <FormControl className="formControl">
                <Select
                  className="formControl"
                  defaultValue={headers[0].id}
                  onChange={handleChange}
                  disableUnderline
                >
                  {headers.map((header) => {
                    return (
                      <MenuItem value={header.id} key={header.id}>
                        {header.label}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};
