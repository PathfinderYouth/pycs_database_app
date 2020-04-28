import React from 'react';
import Typography from '@material-ui/core/Typography'
import { Link } from '@reach/router';
import { NavDrawer } from './NavDrawer';

// container that holds all database UI objects
export const Database = () => (
    <>
        <Typography variant='h3' >Database UI</Typography>
        <NavDrawer/>
        {/* Components go here */}
        <Link to='/'><Typography>Back to the intake form</Typography></Link>
    </>
)
