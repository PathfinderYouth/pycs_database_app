import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  // Overriding gutterButtom class for Typography using classes.
  // https://material-ui.com/customization/components/
  gutterBottom: {
    marginBottom: '1em',
  },
}));

const sampleData = {
  dateJoined: '20 Apr 2020',
  sinNumber: '123 456 789',
  birthday: '21 May 1994',
  phone: '604 888 8888',
  notes:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ultrices egestas efficitur. Curabitur a lacus vehicula ante egestas convallis quis non diam. Duis posuere eleifend justo, eu lacinia turpis imperdiet eget. Quisque sed neque nec nisl accumsan blandit. Vivamus scelerisque libero ut felis fringilla, rutrum condimentum nulla ornare. Vivamus blandit sapien id sem facilisis malesuada. Sed dictum vehicula sem, nec efficitur mauris convallis a. Donec tincidunt tortor non augue mattis accumsan. Aliquam eu vulputate orci, nec vestibulum tortor. Donec consectetur neque id scelerisque aliquam. Nulla vulputate, sapien dictum dapibus auctor, nisi quam facilisis urna, convallis placerat massa augue vel enim. Pellentesque rhoncus ligula risus, in congue neque varius eu. In tincidunt nisi ut risus volutpat sagittis.',
};

export const RecordDialog = (props) => {
  const classes = useStyles();

  const {
    lastName,
    firstName,
    address,
    city,
    status,
    birthDate,
  } = props.recordListClicked;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuButton = (
    <div>
      <IconButton
        aria-label="more options"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={open}
        onClose={handleMenuClose}
      >
        <MenuItem>Edit</MenuItem>
        <MenuItem>Delete</MenuItem>
      </Menu>
    </div>
  );

  return (
    <Dialog
      open={props.openDialog}
      onClose={props.handleDialogClose}
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth={'lg'}
    >
      <DialogTitle id="form-dialog-title">
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          {lastName},{firstName}
          {menuButton}
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Typography
          gutterBottom
          classes={{
            gutterBottom: classes.gutterBottom,
          }}
        >
          Status: {status}
        </Typography>
        <Typography
          gutterBottom
          classes={{
            gutterBottom: classes.gutterBottom,
          }}
        >
          Date joined: {sampleData.dateJoined}
        </Typography>
        <Typography
          gutterBottom
          classes={{
            gutterBottom: classes.gutterBottom,
          }}
        >
          Social insurance number: {sampleData.sinNumber}
        </Typography>
        <Typography
          gutterBottom
          classes={{
            gutterBottom: classes.gutterBottom,
          }}
        >
          Birthday: {birthDate}
        </Typography>
        <Typography
          gutterBottom
          classes={{
            gutterBottom: classes.gutterBottom,
          }}
        >
          Address: {address}, {city}
        </Typography>
        <Typography
          gutterBottom
          classes={{
            gutterBottom: classes.gutterBottom,
          }}
        >
          Phone number: {sampleData.phone}
        </Typography>
        <Typography
          gutterBottom
          classes={{
            gutterBottom: classes.gutterBottom,
          }}
        >
          Notes: {sampleData.notes}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};
