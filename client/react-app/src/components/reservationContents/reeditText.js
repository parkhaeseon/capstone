import React from 'react';
import { makeStyles, fade} from '@material-ui/core/styles';
import { TextField, } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  reeditMargin: {
    margin: theme.spacing(1),
  },
}));

const useStylesReddit = makeStyles(theme => ({
  root: {
    border: '1px solid #e2e2e1',
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: '#fcfcfb',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:hover': {
      backgroundColor: '#fff',
    },
    '&$focused': {
      backgroundColor: '#fff',
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main,
    },
  },
  focused: {},
}));

function RedditTextField(props) {
  const classes = useStylesReddit();

  return <TextField InputProps={{ classes, disableUnderline: true }} {...props} />;
}


export default function ReeditText() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
 
        <RedditTextField
            label="시1발"
            required
            className={classes.reeditMargin}
            variant="filled"
            id="reddit-input"
        />
          <br/>
        <RedditTextField
            label="시2발"
            required
            className={classes.reeditMargin}
            variant="filled"
            id="reddit-input"
        />
        <br/>
        <RedditTextField
            label="시3발"
            required
            className={classes.reeditMargin}
            variant="filled"
            id="reddit-input"
        />
    </div>
  );
}