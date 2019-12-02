import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  typo:{
    marginBottom:theme.spacing(1),
  },
}));

export default function Title(props) {
  const classes = useStyles();
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom className={classes.typo}>
      {props.children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};
