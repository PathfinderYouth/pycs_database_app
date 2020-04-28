import React from 'react';
import Typography from '@material-ui/core/Typography'
import { Link } from '@reach/router';

// container that holds all intake form UI objects
export const IntakeForm = () => (
    <>
        <Typography variant='h3'>Intake Form UI</Typography>
        {/* Components go here */}
        <Link to='/sign-in'><Typography>Sign in to the database</Typography></Link>
    </>
)
