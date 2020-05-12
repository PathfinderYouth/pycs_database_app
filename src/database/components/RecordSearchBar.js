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

const useStyles = makeStyles((theme) => ({
  root: { padding: theme.spacing(2) },
  button: { marginLeft: theme.spacing(1) },
}));

export const RecordSearchBar = (props) => {
  const classes = useStyles();
  const { title, headers } = props;
  const [searchDefault, setSearchDefault] = useState(headers[0].id);
  const [searchBy, setSearchBy] = useState(searchDefault);
  const [searchText, setSearchText] = useState('');

  const handleChange = (event) => {
    setSearchBy(event.target.value);
  };

  useEffect(() => {
    setSearchDefault(headers[0].id);
  }, [headers]);

  const getSearchText = (event) => {
    setSearchText(event.target.value);
  };

  const onKeyPressed = (event) => {
    if (event.key === 'Enter') {
      onSubmit();
    }
  };

  const onSubmit = () => {
    console.log(searchText + ' ' + searchBy);
    //TODO return this to whatever is doing the search
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
};
