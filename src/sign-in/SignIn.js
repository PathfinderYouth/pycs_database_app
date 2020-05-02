import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from '@reach/router';

// container that holds all sign in page UI objects
export const SignIn = () => (
  <>
    <Typography variant="h3">Sign-In Page UI</Typography>
    {/* Components go here */}
    <Link to="/database">
      <Typography>Sign in</Typography>
    </Link>
  </>
);
